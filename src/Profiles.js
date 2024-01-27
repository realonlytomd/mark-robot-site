import './Profiles.css';

function Profiles() {
    return (
        <div className='Profiles'>
            <p>Profiles go here</p>
            <form onSubmit={storeRobot}>
                <label for="rname">Robot name:</label>
                <input type = "text" value="robotname" onChange={handleChange} />
                <p><label for="rbio">Robot Description:</label></p>
                <textarea id="robotbio" name="robotbio" rows="10" cols="50"></textarea>
                <input type="submit" value="Submit" />
                
            </form>;
        </div>
    );
}

export default Profiles;