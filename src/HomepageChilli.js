import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { getCabaiHistory } from "./api/firebaseconfig";
import { Line } from "react-chartjs-2";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // ✅ tambahkan ini
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Power, Droplet } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL:
    "https://kelembabancabai-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [cabaiData, setCabaiData] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [isCekTanah, setIsCekTanah] = useState(false);
  const [lastCekTanahTime, setLastCekTanahTime] = useState(null);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const handleToggleSwitch = () => {
    const newStatus = isOn ? "mati" : "hidup";
    setIsOn(!isOn);
    update(ref(database, "/plant"), { statusPompa: newStatus })
      .then(() => console.log(`Status pompa diperbarui: ${newStatus}`))
      .catch((error) => console.error("Gagal memperbarui statusPompa:", error));
  };

  const handleCekTanah = () => {
    if (isCooldown) {
      Swal.fire({
        icon: "info",
        title: "Cek Tanah Tidak Bisa",
        text: "Cek tanah hanya bisa dilakukan setiap 1 menit sekali.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setIsCekTanah(true);

    update(ref(database, "/plant"), { statusTanah: "hidup" })
      .then(() => {
        console.log("Status cek tanah diperbarui: hidup");

        setTimeout(() => {
          update(ref(database, "/plant"), { statusTanah: "mati" });
          setIsCekTanah(false);
          console.log("Status cek tanah direset ke: mati");
        }, 5000);

        const now = Date.now();
        setLastCekTanahTime(now);
        localStorage.setItem("lastCekTanahTime", now.toString());

        setIsCooldown(true);
        setCooldownRemaining(60); // ⏱️ 1 menit dalam detik

        const interval = setInterval(() => {
          setCooldownRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsCooldown(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      })
      .catch((error) => console.error("Gagal memperbarui statusTanah:", error));
  };

  useEffect(() => {
    const statusRef = ref(database, "/plant/statusPompa");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsOn(snapshot.val() === "hidup");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const statusTanahRef = ref(database, "/plant/statusTanah");
    const unsubscribe = onValue(statusTanahRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsCekTanah(snapshot.val() === "hidup");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedTime = localStorage.getItem("lastCekTanahTime");
    if (savedTime) {
      const timePassed = Date.now() - parseInt(savedTime);
      const remaining = 600 - Math.floor(timePassed / 1000); // dalam detik
      if (remaining > 0) {
        setIsCooldown(true);
        setCooldownRemaining(remaining);
        const interval = setInterval(() => {
          setCooldownRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsCooldown(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  }, []);

  useEffect(() => {
    getCabaiHistory((data) => {
      const latestData = data.slice(-6).reverse();
      setCabaiData(latestData);
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen font-sans">
      <Navbar />
      <main className="w-full px-4 py-8 md:px-10">
        <Dashboard
          cabaiData={cabaiData}
          isOn={isOn}
          handleToggleSwitch={handleToggleSwitch}
          isCekTanah={isCekTanah}
          handleCekTanah={handleCekTanah}
          isCooldown={isCooldown}
          cooldownRemaining={cooldownRemaining}
        />
      </main>
      <Footer />
    </div>
  );
}

const Dashboard = ({
  cabaiData,
  isOn,
  handleToggleSwitch,
  isCekTanah,
  handleCekTanah,
  isCooldown,
  cooldownRemaining,
}) => {
  return (
    <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg space-y-10">
      <motion.h1
        className="text-4xl font-bold text-center text-red-500 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Monitoring Kelembaban Tanaman Cabai
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pompa */}
        <div className="grid grid-cols-1 gap-5">
          <motion.div
            className="bg-red-100 border border-red-300 p-5 rounded-xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Status Pompa
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <Power
                className={`w-6 h-6 ${
                  isOn ? "text-green-500 animate-pulse" : "text-red-500"
                }`}
              />
              <span
                className={`font-bold ${
                  isOn ? "text-green-600" : "text-red-600"
                }`}
              >
                Pompa {isOn ? "MENYALA" : "MATI"}
              </span>
            </div>

            <motion.button
              className={`w-full py-2 px-4 rounded-lg text-white font-bold shadow-md transition-all ${
                isOn
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={handleToggleSwitch}
              whileTap={{ scale: 0.95 }}
            >
              {isOn ? "Matikan Pompa" : "Nyalakan Pompa"}
            </motion.button>
          </motion.div>

          {/* Cek Tanah */}
          <motion.div
            className="bg-blue-100 border border-blue-300 p-5 rounded-xl shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Status Lingkungan Tanah
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <Droplet
                className={`w-6 h-6 ${
                  isCekTanah ? "text-blue-500 animate-pulse" : "text-gray-400"
                }`}
              />
              <span
                className={`font-bold ${
                  isCekTanah ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Cek Tanah {isCekTanah ? "AKTIF" : "NONAKTIF"}
              </span>
            </div>

            <motion.button
              className={`w-full py-2 px-4 rounded-lg text-white font-bold shadow-md transition-all ${
                isCekTanah || isCooldown
                  ? "bg-blue-700 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleCekTanah}
              whileTap={{ scale: isCooldown ? 1 : 0.95 }}
              disabled={isCooldown}
            >
              {isCekTanah ? "Matikan Cek Tanah" : "Cek Tanah"}
            </motion.button>

            {isCooldown && (
              <p className="text-xs text-blue-600 mt-2 text-center">
                Cek tanah dapat dilakukan lagi dalam{" "}
                {Math.floor(cooldownRemaining / 60)} menit{" "}
                {cooldownRemaining % 60} detik.
              </p>
            )}
          </motion.div>
        </div>

        {/* Grafik */}
        <motion.div
          className="col-span-2 bg-white border border-orange-200 p-5 rounded-xl shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-xl font-semibold text-orange-500 mb-4">
            Grafik Kelembaban
          </h2>
          <Line
            data={{
              labels: cabaiData.map((d) => d.waktu),
              datasets: [
                {
                  label: "Kelembaban (%)",
                  data: cabaiData.map((d) => d.kelembaban),
                  fill: true,
                  borderColor: "#fb923c",
                  backgroundColor: "rgba(251,146,60,0.15)",
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { labels: { color: "#fb923c" } },
              },
              scales: {
                x: { ticks: { color: "#888" } },
                y: { ticks: { color: "#888" } },
              },
            }}
          />
        </motion.div>
      </div>

      {/* Tabel */}
      <motion.div
        className="bg-white border border-gray-200 p-5 rounded-xl shadow-md overflow-x-auto"
        whileHover={{ scale: 1.005 }}
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Riwayat Data Sensor
        </h2>
        <table className="min-w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-orange-100 text-orange-700">
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Hari</th>
              <th className="py-2 px-4">Waktu</th>
              <th className="py-2 px-4">Kelembaban Udara (%)</th>
              <th className="py-2 px-4">Suhu (°C)</th>
              <th className="py-2 px-4">Kelembaban Tanah (%)</th>
              <th className="py-2 px-4">Estimasi Tanah Kering</th>
              <th className="py-2 px-4">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {cabaiData.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4">{row.tanggal}</td>
                <td className="py-2 px-4">{row.hari}</td>
                <td className="py-2 px-4">{row.waktu}</td>
                <td className="py-2 px-4">{row.kelembaban}</td>
                <td className="py-2 px-4">{row.suhu}</td>
                <td className="py-2 px-4">{row.persentase}</td>
                <td className="py-2 px-4">{row.estimasiKering}</td>
                <td className="py-2 px-4">{row.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default App;
