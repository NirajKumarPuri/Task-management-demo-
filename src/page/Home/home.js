import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Divider from "@mui/material/Divider";
const getData = () => {
  const data = JSON.parse(window.localStorage.getItem("task"));
  if (data) {
    return data;
  } else {
    return [];
  }
};
export default function Home({ item, state, open, isMobile }) {
  const [task, setTask] = useState(getData());
  const [existingUserTask, setExistingUserTask] = useState([]);
  const [existingUserLeave, setExistingUserLeave] = useState([]);
  useEffect(() => {
    setTask(getData());
  }, []);
  useEffect(() => {
    const newexistingUserData = task?.find((element) => element.id == item?.id);
    if (newexistingUserData?.task?.length > 0) {
      setExistingUserTask([...newexistingUserData?.task]);
    }
    if (newexistingUserData?.leave?.length > 0) {
      setExistingUserLeave([...newexistingUserData?.leave]);
    }
  }, [task]);

  return (
    <div className={styles.container}>
      <div className={styles.headerbox}>
        <div className={open ? styles.openavtarbox : styles.avtarbox}>
          <div className={styles.avtar}></div>
          <h2 className={styles.nametext}>{state?.name}</h2>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentone}>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Employee Name :</span>
            <div className={styles.textvalue}>{state?.name}</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Employee Id :</span>
            <div className={styles.textvalue}>{item?.id}</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Employee Email Id :</span>
            <div className={styles.textvalue}>
              {state?.name}@AlienBrains.com
            </div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>mobile No :</span>
            <div className={styles.textvalue}>7001787892</div>
          </div>

          <div className={styles.detailbox}>
            <span className={styles.lable}>Joing Date :</span>
            <div className={styles.textvalue}>15/07/2021</div>
          </div>
        </div>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} />
        <div className={styles.contenttwo}>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Reporting manager :</span>
            <div className={styles.textvalue}>Prakhar Birla</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Reporting manager Id :</span>
            <div className={styles.textvalue}>HRM123</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Joing By :</span>
            <div className={styles.textvalue}>Tanvi singh</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Address :</span>
            <div className={styles.textvalue}>Purulia West Bengal</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Adhar No :</span>
            <div className={styles.textvalue}>2304-4234-5964</div>
          </div>
        </div>
      </div>
      <div className={open ? styles.boxopen : styles.box}>
        <div className={styles.boxone}>
          <h3 className={styles.boxoneheader}>Leave</h3>
          <div className={styles.renderbox}>
            {existingUserLeave?.length > 0 ? (
              existingUserLeave?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles.leavebox}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#d5d5d5" : "#48494b",
                      color: index % 2 === 0 ? "black" : "white",
                      marginBottom: "5px",
                      paddingLeft: "5px",
                    }}
                  >
                    <div className={styles.leavedetailbox}>
                      <span className={styles.leavelable}>StartDate:</span>
                      <div className={styles.leavetextvalue}>
                        {item.startDate}
                      </div>
                    </div>
                    <div className={styles.leavedetailbox}>
                      <span className={styles.leavelable}>EndDate:</span>
                      <div className={styles.leavetextvalue}>
                        {item.endDate}
                      </div>
                    </div>
                    <div className={styles.leavedetailbox}>
                      <span className={styles.leavelable}>Reason:</span>
                      <div className={styles.leavetextvalue}>{item.reason}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.leaveerrorbox}>No Leave available</p>
            )}
          </div>
        </div>
        <div className={styles.boxtwo}>
          <h3 className={styles.boxtwoheader}>Task</h3>
          <div className={styles.renderbox}>
            {existingUserTask?.length > 0 ? (
              existingUserTask?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles.leavebox}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#d5d5d5" : "#48494b",
                      color: index % 2 === 0 ? "black" : "white",
                      marginBottom: "5px",
                      paddingLeft: "5px",
                    }}
                  >
                    <div className={styles.leavedetailbox}>
                      <span className={styles.leavelable}>TaskId:</span>
                      <div className={styles.leavetextvalue}>{item.taskId}</div>
                    </div>
                    <div className={styles.leavedetailbox}>
                      <span className={styles.leavelable}>TaskName:</span>
                      <div className={styles.leavetextvalue}>
                        {item.taskName}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.leaveerrorbox}>No Task available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
