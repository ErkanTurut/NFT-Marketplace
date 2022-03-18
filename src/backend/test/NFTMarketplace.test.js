const { expect } = require("chai");

describe("NFTMarketplace", function () {
  let deployer, addr1, addr2, nft, marletplace;
  let feePercent = 1;
  let URI = "sample URI";

  beforeEach(async function () {
    //get contract factories
    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    //get signers
    [deployer, addr1, addr2] = await ethers.getSigners();

    //Deploy contracts
    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  });

  describe("Deployment", function () {
    it("Should track name and symbol of the nft collection", async function () {
      expect(await nft.name()).to.equal("SirKamso");
      expect(await nft.symbol()).to.equal("KAM");
    });
    it("Should track feeAccount and feePercent of the nft collection", async function () {
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(feePercent);
    });
  });

  describe("Minting NFT's", function () {
    it("should track each minted NFT", async function () {
      //addr1 mint an nft
      await nft.connect(addr1).mint(URI);
      expect(await nft.tokenCount()).to.equal.apply(1);
      expect(await nft.balanceOf(addr1.address)).to.equal(1);
      expect(await nft.tokenURI(1)).to.equal.apply(URI);

      //addr2 mint an nft
      await nft.connect(addr2).mint(URI);
      expect(await nft.tokenCount()).to.equal.apply(2);
      expect(await nft.balanceOf(addr2.address)).to.equal(1);
      expect(await nft.tokenURI(2)).to.equal.apply(URI);
    });
  });

  describe("making marketplace items", function () {
    beforeEach(async function () {
      //addr 1 mints an nft
      await nft.connect(addr1).mint(URI);
      //addr1 pproves marketplace to spend nft
      await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
    });
    it("should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function () {
      //add1 offers their nft at a price of 1 ether
      await expect(
        marketplace.connect(addr1).makeItem(nft.address, 1, toWei(1))
      )
        .to.emit(matketplace, "offered")
        .withArgs(1, nft.address, 1, toWei(1), addr1.address);

      //awner of NFT should now be the marketplace
      expect(await nft.ownerOf(1)).to.equal(marketplace.address);
      //item count should new equal 1
      expect(await marketplace.itemCount()).to.equal(1);

      //get item from items mapping then check fields to ensure they are correct

      const item = await marketplace.items(1);
      expect(item.itemID).to.equal(1);
      expect(item.nft).to.equal(nft.address);
      expect(item.tokenId).to.equal(1);
      expect(item.price).to.equal(toWei(1));
      expect(item.sold).to.equal(false);
    });

    it("should fail if price is set to zero", async function () {
      await expect(
        marketplace
          .connect(addr1)
          .marketItem(nft.address, 1, 0)
          .to.be.revertedtWith("Price must be greater than zero")
      );
    });
  });
});
