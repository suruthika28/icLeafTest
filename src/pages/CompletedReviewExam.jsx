import React, { useEffect, useState } from 'react';
import MainHeader from '../components/MainHeader';
import MainHeader1 from '../components/MainHeader1';
import '../styles/styles.css'
import userService from '../services/userService';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import AvailableExams from './AvailableExams';
import ApiCall from '../services/ApiCall';
import CompletedExams from './CompletedExams';

function CompletedReviewExam() {
    const token = localStorage.getItem("token");
    const [packName, setPackName] = useState('')
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [subjectNames, setSubjectNames] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [filterText, setFilterText] = useState('');
    const [data, setData] = useState([]);
    const [time, setTime] = useState();
    const [showAvailableExams, setShowAvailableExams] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getCompletedExamSubjects();
        getServerDateTime();
    }, []);
    const method = "post";
    const url = "getCompletedReviewExamDetails";
    const dataa = {};
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const getCompletedExamSubjects = () => {
        ApiCall
            .PostApi(method, url, dataa, headers)
            .then((response) => {
                console.log(response,"resp")
                const subjects = response.data.obj1;
                setSubjectNames(subjects);
            })
            .catch((error) => {
                alert(error);
            });
    }

    const getServerDateTime = () => {
        userService
            .GetServerDateTime()
            .then((response) => {
                console.log(response, "time")
                setTime(response)
            })
    }
    const handleSubjectSelect = (event) => {
        const selectedSubjectId = event.target.value;
        setSelectedSubjectId(selectedSubjectId);
        const url1 = `activeexampack?categoryid=${selectedSubjectId}`;

        setShowAvailableExams(false)

        ApiCall
            .PostApi(method, url1, dataa, headers)
            .then((response) => {
                console.log(response);
                setData(response.data);

            })
            .catch((error) => {
                alert(error);
            });
    }

    const handleAvailableExamsClick = (id, name) => {
        setPackName(name)
        console.log("ddd")
        setSelectedItemId(id);
        setShowAvailableExams(true);
    }

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
    };

    const tabledata = data.filter((item) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    const customStyles = {
        headRow: {
            style: {
                marginTop: '1%',
                color: 'white'
            }
        },
        headCells: {
            style: {
                backgroundColor: '#006687',
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '15px',
            }
        },
        cells: {
            style: {
                backgroundColor: '#EEF4FD',
                display: 'flex',
                justifyContent: 'center',
            }
        },
        table: {
            style: {
                width: '90%',
                paddingLeft: '5%'
                // margin: '', 
            }
        },
        pagination: {
            style: {
                width: '90%', // Adjust the width as needed
                // margin: '0 auto', // Center the pagination controls
            },
        },
    };

    const columns = [
        {
            name: 'Pack Name',
            selector: (item) => item.name,
            sortable: true
        },
        {
            name: 'Description',
            selector: (item) => item.description,
            sortable: true
        },
        {
            name: 'Pack Enquiry',
            selector: (item) => {
                const timestamp = item.packExpiry;
                const date = new Date(timestamp);
                const formattedDate = date.toLocaleDateString();
                return formattedDate;
            },
            sortable: true
        },
        {
            name: 'Details',
            sortable: true,
            cell: (item) => (
                <>
                    <button
                        style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white' }}
                        onClick={() => handleAvailableExamsClick(item.id, item.name)}>View Exams</button>
                </>
            )
        }
    ];

    return (
        <div>
            <div>
                <MainHeader1 />
            </div>
            <MainHeader />
            <div className="dropdown-container">
                <label style={{ fontWeight: "bold" }}>Select Subject</label>
                <select className="dropdown" onChange={handleSubjectSelect}>
                    <option value="">Select a Subject</option>
                    {subjectNames.map((subject) => (
                        <option key={subject.subjectId} value={subject.subjectId}>
                            {subject.subjectName}
                        </option>
                    ))}
                </select>
            </div>
              <div className='dropdown-container'>
                <h2>Available Exam Packs</h2>
            </div> 
            <DataTable
                className='dataTable'
                columns={columns}
                data={tabledata}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                paginationRowsPerPageOptions={[10, 25, 50, 75, 100]}
                customStyles={customStyles}
            />
            {showAvailableExams && (
                <div>
                    <CompletedExams examPackId={selectedItemId}  />
                </div>
            )} 
        </div>
    );
}

export default CompletedReviewExam;
