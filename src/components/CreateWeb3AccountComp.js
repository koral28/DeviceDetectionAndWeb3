import { useState } from "react";
import { useForm } from "react-hook-form";
import Web3 from "web3";
import { keccak256 } from "ethereum-cryptography/keccak";
import { HDKey } from "ethereum-cryptography/hdkey";
import * as bip39 from "bip39";

const CreateWeb3AccountComp = () => {
  const { register, handleSubmit, errors } = useForm();
  const [mnemonic, setMnemonic] = useState("");
  const [path, setPath] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/37aeb605ec92472cbda3970760bc8cc2"
    )
  );

  const Mnemonic = (e) => {
    setMnemonic(e.target.value);
  };
  const Path = (e) => {
    setPath(e.target.value);
  };

  const onSubmit = () => {
    // const mnemonic = bip39.generateMnemonic();
    const BIP39Seed = bip39.mnemonicToSeedSync(mnemonic).toString("hex");
    const hdkey = HDKey.fromMasterSeed(Buffer.from(BIP39Seed, "hex"));
    const BIP32RootKey = hdkey.privateExtendedKey;
    const key = keccak256(Buffer.from(BIP32RootKey)).toString("hex");
    const childkey = hdkey.derive(path);
    const BIP32ExtendedPrivateKey = childkey.privateExtendedKey;
    const key2 = keccak256(Buffer.from(BIP32ExtendedPrivateKey)).toString(
      "hex"
    );
    web3CreateAccount(key, key2);
  };

  const web3CreateAccount = (key, key2) => {
    const account = web3.eth.accounts.wallet.add({
      privateKey: key,
      address: key2,
    });
    const wallets = web3.eth.accounts.wallet;
    for (var i = 0; i < wallets.length; i++) {
      if (wallets[i].privateKey.slice(2) === key) {
        setAddress(wallets[i].address);
        web3.eth.getBalance(web3.eth.accounts.wallet[i].address, function (
          err,
          result
        ) {
          if (err) {
            console.log(err);
          } else {
            setBalance(web3.utils.fromWei(result, "ether") + " ETH");
          }
        });
      }
    }
  };

  return (
    <div className="container" style={{ padding: "50px", width: "50%" }}>
      <label style={{ fontSize: "25px", fontWeight: "bold", color: "white" }}>
        Create web3 Account
      </label>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>mnemonic</label>
          <input
            type="text"
            name="mnemonic"
            ref={register({
              required: "mnemonic is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
            onChange={Mnemonic}
          />
        </div>
        {errors.mnemonic && <h6>{errors.mnemonic.message}</h6>}
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>path</label>
          <input
            type="text"
            name="path"
            ref={register({
              required: "path is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
            onChange={Path}
          />
        </div>
        {errors.path && <h6>{errors.path.message}</h6>}
        <button
          className="waves-effect waves-light blue btn-small"
          type="submit"
        >
          Create
        </button>
        <br />
        <br />
        {address}
        <br />
        {balance}
      </form>
    </div>
  );
};

export default CreateWeb3AccountComp;
