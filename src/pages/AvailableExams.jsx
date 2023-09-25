import React, { useEffect, useState } from 'react';
import MainHeader from '../components/MainHeader';
import MainHeader1 from '../components/MainHeader1';
import '../styles/styles.css'
import userService from '../services/userService';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import ApiCall from '../services/ApiCall';

function AvailableExams(props) {
    const { examPackId } = props;
    const { packName } = props;
    const token = localStorage.getItem("token");
    const [examName, setExamName] = useState('')
    const [subjectNames, setSubjectNames] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [filterText, setFilterText] = useState('');
    const [data, setData] = useState([]);
    const [activeexamdetails, setActiveExamDetails] = useState([]);
    const [showActiveExamDetails, setShowActiveExamDetails] = useState(false);
    const [time, setTime] = useState();
    const [showAvailableExams, setShowAvailableExams] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getActiveExamEdit();
    }, []);

    const method = "post";
    const url = `activeexamedit?examPackId=${examPackId}`;
    const dataa = {}
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const getActiveExamEdit = () => {
        ApiCall
            .PostApi(method, url, dataa, headers)
            .then((response) => {
                console.log(response, "Available Exams");
                // console.log(response.data.exam.examName)
                setData(response.data)
            })
            .catch((error) => {
                alert(error);
            });
    }
    const handleNavigate = (id) => {
        navigate('/getSummary', { state: { examTakenId: id } })
    }


    const handleStartExam = (id) => {
        navigate('/startexam', { state: { examId: id, examPackId: examPackId } })
    }
    const showExamHistory = (id, examName) => {
        setShowActiveExamDetails(true)
        setExamName(examName)
        userService
            .ActiveExamDetails(token, id, examPackId)
            .then((response) => {
                console.log(response, "activeExamDetails")
                setActiveExamDetails(response.data)
            })
            .catch((error) => {
                alert(error);
            })
    }

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
    };

    const tabledata = data.filter((item) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    const tabledata1 = activeexamdetails.filter((item) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);

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
            name: 'Exam Name',
            selector: (item) => item.examName,
            sortable: true
        },
        {
            name: 'Description',
            selector: (item) => item.description,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Exam Type',
            selector: (item) => {
                var examType = ""
                if (item.examCategory === 0) {
                    examType = "Practice"
                }
                else if (item.examCategory === 1) {
                    examType = "Final"
                }
                else {
                    examType = ""
                }
                return examType;
            },
            sortable: true
        },
        {
            name: 'Expiry Details',
            sortable: true,
            selector: (item) => {
                var expiryDet = ""
                if (item.examCategory === 0) {
                    expiryDet = "No Expiry"
                }
                else {
                    expiryDet = ""
                }
                return expiryDet;
            }
        },
        {
            name: 'Attempt Exam',
            sortable: true,
            cell: (item) => (
                <>
                    <button
                        style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white' }}
                        onClick={() => handleStartExam(item.id)}>Start Exam</button>
                </>
            )
        },
        {
            name: 'Details',
            sortable: true,
            cell: (item) => (
                item.examTaken === false ? (
                    <span>Yet to be taken</span>
                ) : (
                    <button
                        style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white' }}
                        onClick={() => showExamHistory(item.id, item.examName)}>Exam History</button>
                )
            )
        }
    ];
    const columns1 = [
        {
            name: 'Date-Start Time',
            // selector: (item) => item.formattedStartDateTime,
            selector: (item) => {
                const inputDateStr = item.formattedStartDateTime;

                const parts = inputDateStr.split(" ");
                const timePart = parts[0];
                const datePart = parts.slice(-2).join(" ");

                const date = new Date(datePart);
                const hours = parseInt(timePart.split(":")[0]);
                const minutes = parseInt(timePart.split(":")[1]);

                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                const formattedTime = `${hours}:${minutes}:${date.getSeconds()}`;

                return `${formattedDate} - ${formattedTime}`; // Return the formatted string
            },
            sortable: true
        },
        {
            name: 'Date-End Time',
            selector: (item) => {
                const inputDateStr = item.formattedEndDateTime;

                const parts = inputDateStr.split(" ");
                const timePart = parts[0];
                const datePart = parts.slice(-2).join(" ");

                const date = new Date(datePart);
                const hours = parseInt(timePart.split(":")[0]);
                const minutes = parseInt(timePart.split(":")[1]);

                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                const formattedTime = `${hours}:${minutes}:${date.getSeconds()}`;

                return `${formattedDate} - ${formattedTime}`; // Return the formatted string
            },
            sortable: true,
            wrap: true,
        }
        ,
        {
            name: 'Status',
            selector: (item) => {
                var status = ""
                if (item.status === 1) {
                    status = "Completed"
                }
                else {
                    if (item.exampack.expiredStatus === "true") {
                        status = "Not Completed"
                    }
                    else {
                        status = "Not Completed"
                    }
                }
                return status;
            },
            sortable: true
        },
        {
            name: 'Percent',
            sortable: true,
            selector: (item) => item.obtainedPercentage + '%'
        },
        {
            name: 'Expiry Status',
            sortable: true,
            cell: (item) => {
                if (item.status === 1) {
                    return (
                        <button style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white' }} onClick={handleNavigate(item.id)}>Get Summary</button>
                    );
                } else {
                    if (item.expiredStatus === "true") {
                        return (
                            <span style={{ color: 'red' }}
                            >Resume</span>
                        );
                    } else {
                        return (
                            <span style={{ color: 'red' }}
                            >Resume</span>);
                    }
                }
            },
        },

        {
            name: 'Action',
            sortable: true,
            cell: (item) => {
                if (item.status === 1) {
                    return (
                        <button style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white' }}
                        >Review Exam</button>
                    );
                } else {
                    if (item.expiredStatus === "true") {
                        return (
                            <label>Expired</label>
                        );
                    } else {
                        return (
                            <label>Not Expire</label>
                        );
                    }
                }
            },
        }
    ];
    return (
        <div>
            <div className='dropdown-container'>
                <h2>Available Exams</h2>
                <label>Pack Name : {packName}</label>
                {console.log(packName, "jsvjfsnvjfsnj")}
            </div>
            <div style={{ alignContent: 'center', justifyContent: 'center' }}>
                <DataTable
                    columns={columns}
                    data={tabledata}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    paginationRowsPerPageOptions={[10, 25, 50, 75, 100]}
                    customStyles={customStyles}
                />
            </div>
            {showActiveExamDetails && (
                <div>
                    <div className='dropdown-container'>
                        <h2>Exam Detail</h2>
                        <label>Exam Name : {examName}</label>
                    </div>
                    <DataTable
                        columns={columns1}
                        data={tabledata1}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        paginationRowsPerPageOptions={[10, 25, 50, 75, 100]}
                        customStyles={customStyles}
                    />
                </div>
            )}
        </div>
    );
}

export default AvailableExams;
