import React, { useState, useEffect} from 'react'
import '../style/Reportpage.css'
import authConfig from '../api/authConfig';


function Reported() {
  const [reportList, setReportList] = useState([]);

  const fetchReports = async () => {
    try {
        const response = await fetch('http://localhost:5001/api/reports/', authConfig); 
        const ReportListData = await response.json();
        console.log(ReportListData)
        setReportList(ReportListData);
    } catch (err) {
      console.log('Error fetching report details:', err);
    }
  };

  useEffect(() => {
    fetchReports();
    
  }, []);


  return (
    <div className='report-container'>
      <div className="reports-container">
            {reportList.reverse().map(reportList => (
                <div className="report-item" key={reportList.id}> 
                    <div>
                      <div className="report-name">
                        <h2>{reportList.typeOfReport}</h2>
                      </div>
                      <div className="report-author">
                        <h3>{reportList.subject}</h3>
                      </div>
                      <div className="report-author">
                        <h4>{reportList.details}</h4>
                      </div>
                  </div>
                </div>
            ))}
    
        </div>
    </div>
  )
}

export default Reported