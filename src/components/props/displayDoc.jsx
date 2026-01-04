import "./../css/displayDoc.css";
const invoice = "/pdfData/Invoice-Template.pdf";

const packingList = "/pdfData/Packing-List.pdf";
const CertificateOfOrigin = "/pdfData/Certificate-Of-Origin.pdf";

function DisplayDoc() {
  const view = (index) => {
    const docs = [invoice, packingList, CertificateOfOrigin];

    window.open(docs[index], "_blank");
  };

  return (
    <div className="document-list-container">
      <h3 className="doc-title">Required Documents</h3>

      <ul className="document-list">
        <li className="document-item">
          <h4>Invoice</h4>
          <p>Commercial invoice of the shipment</p>
          <button onClick={() => view(0)}>View</button>
        </li>

        <li className="document-item">
          <h4>Packing List</h4>
          <p>Details of all packages</p>
          <button onClick={() => view(1)}>View</button>
        </li>

        <li className="document-item">
          <h4>Certificate of Origin</h4>
          <p>Proof of shipment origin</p>
          <button onClick={() => view(2)}>View</button>
        </li>

        <li className="document-item">
          <h4>KYC</h4>
          <p>Shipper verification document</p>
          <p>PAN/ADHAR/GST(For Company)</p>
        </li>
      </ul>
    </div>
  );
}

export default DisplayDoc;
