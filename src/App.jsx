import { Switch, Route, Redirect } from "wouter";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { Toaster } from "@/components/ui/toaster";

import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Assignments from "@/pages/assignments.jsx";
import AssignmentDetails from "@/pages/assignment-details.jsx";
import CreateAssignment from "@/pages/create-assignment.jsx";
import PeerReview from "@/pages/peer-review.jsx";
import ReviewDetails from "@/pages/review-details.jsx";
import Profile from "@/pages/profile.jsx";
import Collaboration from "@/pages/collaboration.jsx";
import NotFound from "@/pages/not-found.jsx";
import Submissions from "@/pages/submissions.jsx";
import Analytics from "@/pages/analytics.jsx";
import ReviewAllocation from "@/pages/review-allocation.jsx";
import Settings from "@/pages/settings.jsx";
import Features from "@/pages/features.jsx";
import HowItWorks from "@/pages/how-it-works.jsx";
/* -------------------------------
   Role-Based Protected Route
-------------------------------- */

function PrivateRoute({ component: Component, allowedRoles }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) return <Redirect to="/login" />;

  // Role-based protection
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Redirect to="/dashboard" />;
  }

  return <Component />;
}

/* -------------------------------
   Router
-------------------------------- */

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[hsl(292,27%,36%)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Switch>
      {/* ---------------- Public Routes ---------------- */}

      <Route
        path="/"
        component={user ? () => <Redirect to="/dashboard" /> : Landing}
      />

      <Route path="/review-allocation">
           <PrivateRoute component={ReviewAllocation} />
       </Route>

      <Route
        path="/login"
        component={user ? () => <Redirect to="/dashboard" /> : Login}
      />

      <Route path="/features" component={Features} />
      <Route path="/how-it-works" component={HowItWorks} />

      <Route
        path="/register"
        component={user ? () => <Redirect to="/dashboard" /> : Register}
      />
      <Route path="/submissions">
         <PrivateRoute component={Submissions} />
      </Route>

      {/* ---------------- Protected Routes ---------------- */}

      <Route path="/dashboard">
        <PrivateRoute component={Dashboard} />
      </Route>

      <Route path="/analytics">
          <PrivateRoute component={Analytics} />
      </Route>

      <Route path="/assignments">
        <PrivateRoute component={Assignments} />
      </Route>

      {/* Teacher Only */}
      <Route path="/assignments/create">
        <PrivateRoute
          component={CreateAssignment}
          allowedRoles={["teacher"]}
        />
      </Route>

<Route path="/settings">
  <PrivateRoute component={Settings} />
</Route>

      <Route path="/assignments/:id">
        <PrivateRoute component={AssignmentDetails} />
      </Route>

      {/* Student Only */}
      <Route path="/reviews">
        <PrivateRoute
          component={PeerReview}
          allowedRoles={["student"]}
        />
      </Route>

      <Route path="/reviews/:id">
        <PrivateRoute
          component={ReviewDetails}
          allowedRoles={["student"]}
        />
      </Route>

      <Route path="/collaboration">
        <PrivateRoute component={Collaboration} />
      </Route>

      <Route path="/profile">
        <PrivateRoute component={Profile} />
      </Route>

      {/* ---------------- Fallback ---------------- */}

      <Route component={NotFound} />
    </Switch>
  );
}

/* -------------------------------
   App Root
-------------------------------- */

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router />
    </AuthProvider>
  );
}

export default App;