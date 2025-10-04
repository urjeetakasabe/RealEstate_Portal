import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/buyer/Sidebar"; 
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import SearchProperties from "./pages/buyer/SearchProperties";
import PropertyDetails from "./pages/buyer/PropertyDetails";
import SendInquiry from "./pages/buyer/SendInquiry";
import BookingPage from "./pages/buyer/BookingPage";
import ReviewPage from "./pages/buyer/ReviewPage";
import ProfilePage from "./pages/buyer/ProfilePage";
import MyBookings from "./pages/buyer/MyBookings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const BuyerLayout = ({ children }) => (
  <div className="flex min-h-screen w-full">
    <Sidebar />
    <main className="flex-1 overflow-auto">{children}</main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/buyer/dashboard" replace />} />
          
          <Route path="/buyer/dashboard" element={<BuyerLayout><BuyerDashboard /></BuyerLayout>} />
          <Route path="/buyer/search" element={<BuyerLayout><SearchProperties /></BuyerLayout>} />
          <Route path="/buyer/property/:id" element={<BuyerLayout><PropertyDetails /></BuyerLayout>} />
          <Route path="/buyer/send-inquiry" element={<BuyerLayout><SendInquiry /></BuyerLayout>} />
          <Route path="/buyer/my-bookings" element={<BuyerLayout><MyBookings /></BuyerLayout>} />
          <Route path="/buyer/bookings" element={<BuyerLayout><BookingPage /></BuyerLayout>} />
          <Route path="/buyer/inquiries" element={<BuyerLayout><SendInquiry/></BuyerLayout>} />
          <Route path="/buyer/reviews" element={<BuyerLayout><ReviewPage /></BuyerLayout>} />
          <Route path="/buyer/profile" element={<BuyerLayout><ProfilePage /></BuyerLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;