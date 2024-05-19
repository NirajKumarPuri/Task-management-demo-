import React from "react";
import styles from "./home.module.css";
import Divider from "@mui/material/Divider";

export default function Home({ item, state, open, isMobile }) {
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
            <div className={styles.textvalue}>{state.name}</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Employee Id :</span>
            <div className={styles.textvalue}>{item.id}</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Employee Email Id :</span>
            <div className={styles.textvalue}>{state.name}@AlienBrains.com</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>mobile No :</span>
            <div className={styles.textvalue}>7001787892</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Address :</span>
            <div className={styles.textvalue}>Purulia West Bengal</div>
          </div>
          <div className={styles.detailbox}>
            <span className={styles.lable}>Adhar No :</span>
            <div className={styles.textvalue}>2304-4234-5964</div>
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
        </div>
      </div>
    </div>
  );
}
