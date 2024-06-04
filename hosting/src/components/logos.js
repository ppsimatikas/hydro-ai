import './logos.css';

const apps = [
    "Bitcoin",
    "Ethereum",
    "Polygon",
    "Bsc",
    "Sui",
    "Aptos",
    "Avalanche",
    "Arbitrum",
    "Space_Id",
]

function Logos() {
  return (
    <div className="logos">
    {
        apps.map((a, i) => <img key={i} src={a.replace(/\s/g, '_').toLowerCase()+".png"} className="clogo" alt={a} />)
    }
    </div>
  );
}

export default Logos;
