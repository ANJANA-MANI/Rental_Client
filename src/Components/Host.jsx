import React, { useEffect, useState } from 'react';
import { getHostAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/serverurl';
import { useNavigate } from 'react-router-dom';

function Host() {
    const [hosts, setHosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getHost();
    }, []);

    const getHost = async () => {
        const result = await getHostAPI();
        if (result.status === 200) {
            const unique = new Map();
            result.data.forEach((i) => {
                unique.set(i.owner._id, [i.owner.firstname, i.owner.profileImage]);
            });
            //console.log(unique);
            const uniqueHosts = Array.from(unique.entries());
            setHosts(uniqueHosts);
            //console.log('hosts', hosts);
        }
    };

    return (
        <div>
            <h2 style={{ color: 'grey', margin: '10px', fontSize: '40px' }}>Top Hosts</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {hosts.map(([ownerId, [firstname, profileImage]]) => (
                    <div key={ownerId} style={{ marginLeft: '20px', textAlign: 'center', width: '160px', marginTop: '20px' }}>
                        <img
                            className="unique"
                            src={`${BASE_URL}/uploads/${profileImage}`}
                            alt="user"
                            style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover' }}
                            onClick={() => navigate(`/host/properties/${ownerId}`)}
                        />
                        <h2 style={{ color: 'grey' }}>{firstname}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Host;
