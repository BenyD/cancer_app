import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar, Navbar } from "./components";
import { Home, Profile, Onboarding } from "./pages";
import MedicalRecords from "./pages/records/index";
import ScreeningSchedule from "./pages/ScreeningSchedule";
import SingleRecordDetails from "./pages/records/single-record-details";
import { useStateContext } from "./context";
import { usePrivy } from "@privy-io/react-auth";

const App = () => {
  const { ready, authenticated, user, login } = usePrivy();
  const { currentUser, fetchUserByEmail } = useStateContext();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      try {
        if (!ready) {
          return;
        }

        if (!authenticated) {
          login();
          return;
        }

        if (user?.email?.address) {
          await fetchUserByEmail(user.email.address);

          if (!currentUser) {
            navigate("/onboarding");
          }
        }
      } catch (error) {
        // Keep error handling for critical errors
      } finally {
        setIsChecking(false);
      }
    };

    checkUserAndRedirect();
  }, [ready, authenticated, user?.email?.address, currentUser]);

  // Show loading state while checking authentication
  if (!ready || isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#13131a]">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!authenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#13131a]">
        <div className="text-xl text-white">Please login to continue...</div>
      </div>
    );
  }

  return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route
            path="/medical-records/:id"
            element={<SingleRecordDetails />}
          />
          <Route path="/screening-schedules" element={<ScreeningSchedule />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
