import React, { useState } from "react";

export const Tables = (props) => {
    const [vacName, setVacName] = useState('');
    const [expDate, setExpDate] = useState('');
    const [vacData, setVacData] = useState([]);
    const [vacName2, setVacName2] = useState('');
    const [expDate2, setExpDate2] = useState('');
    const [vacData2, setVacData2] = useState([]);
    const [vacName3, setVacName3] = useState('');
    const [expDate3, setExpDate3] = useState('');
    const [vacData3, setVacData3] = useState([]);

    
    const today = new Date();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newVac = { vacName, expDate };
        
        if (new Date(expDate) < today) {
            // Expiration date is before today, add to the first table
            setVacData([...vacData, newVac]);
        } else if (new Date(expDate) <= new Date(today).setDate(today.getDate() + 30)) {
            // Expiration date is between today and 1 month from today, add to the second table
            setVacData2([...vacData2, newVac]);
        } else {
            // Expiration date is more than 1 month from today, add to the third table
            setVacData3([...vacData3, newVac]);
        }

        setVacName('');
        setExpDate('');
    }

    

    return (
        <div className="auth-form-container">
          <h1 style={{ textAlign: 'center', color: 'white' }}>Vaccination Table</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ marginRight: '20px' }}>
                <label htmlFor="vacName" style={{ paddingRight: '10px' }}>Name of Vaccination</label>
                <input
                  value={vacName}
                  onChange={(e) => setVacName(e.target.value)}
                  type="text"
                  placeholder="Name of Vaccination"
                  id="vacName"
                  name="vacName"
                />
              </div>
              <div>
                <label htmlFor="expDate" style={{ paddingRight: '10px' }}>Expiration Date</label>
                <input
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  type="date"
                  name="expDate"
                  id="expDate"
                />
              </div>
            </div>
            <button type="submit">Add</button>
          </form>
      
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ color: 'red', padding: '10px', textAlign: 'center' }}>
                      [URGENT] Past Due Vaccinations
                    </th>
                  </tr>
                  <tr>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Name of Vaccination</th>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
  {vacData.map((vaccination, index) => (
    <tr key={index}>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.vacName}</td>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.expDate}</td>
    </tr>
  ))}
</tbody>
              </table>
            </div>

            <div>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ color: 'black', padding: '10px', textAlign: 'center' }}>
                      Upcoming Vaccinations
                    </th>
                  </tr>
                  <tr>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Name of Vaccination</th>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
  {vacData2.map((vaccination, index) => (
    <tr key={index}>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.vacName}</td>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.expDate}</td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
      
            <div>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ color: 'black', padding: '10px', textAlign: 'center' }}>
                      Current Vaccinations
                    </th>
                  </tr>
                  <tr>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Name of Vaccination</th>
                    <th style={{ background: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
  {vacData3.map((vaccination, index) => (
    <tr key={index}>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.vacName}</td>
      <td style={{ border: '2px solid black', padding: '10px' }}>{vaccination.expDate}</td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          </div>
          <div>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go to Login</button>
    </div>
        </div>
        
      );
      
}

export default Tables;