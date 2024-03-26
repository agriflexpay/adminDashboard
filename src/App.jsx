import { useState } from "react";
import {Route,Routes} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Side_Bar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Agents from "./scenes/agents";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import ManageTeam from "./scenes/users"
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login/Login";
import KukuPlan from "./scenes/plans/kuku/index";
import { useAuth } from "./AUTH/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Plans from "./scenes/business/index";
import  GeographyChart from "./scenes/geography/index"
import MapView from "./scenes/geography/leafelet/index"
import Applications from "./scenes/applications";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const {user} = useAuth()
  const queryClient = new QueryClient()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <CssBaseline />

 
          {
            user!==null && user.user?(
                <div className="app">
            
                {/**handle authentication and routes protections */}
                <Routes>
                <Route path="/login" element={<Login />} />
                </Routes>
                <>
                <Side_Bar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                   <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} />
                    <Route path="/team" element={<ManageTeam />} />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="/kuku" element={<KukuPlan />} />
                    <Route path="/business" element={<Plans />} />
                    <Route path="/geography" element={<GeographyChart/>}/>
                    <Route path="/map" element={<MapView/>}/>
                    <Route path="/applications" element={<Applications/>}/>
                  </Routes>
                </main>
            
                </>
              </div>
              ):<Login></Login>
            }
          
          </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
