import Image from "next/image";
import styles from "./page.module.css";
import TestDashboard from "@/component/TestDashBoard";

export default function Home() {
  return (
    <div className={styles.page}>
      <TestDashboard />
    </div>
  );
}
