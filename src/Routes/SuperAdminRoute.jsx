import ContactsList from "../Component/SuperAdminDashboard/ContactsList";
import SuperAdminDoctorReview from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminDoctorReview";
import SuperAdminGrow from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminGrow";
import SuperAdminHero from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminHero";
import SuperAdminSteps from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminSteps";
import SuperAdminWhyMedmyne from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminWhyMedmyne";
import SuperAdminLectures from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminLectures";
import SuperAdminAllPatient from "../Component/SuperAdminDashboard/SuperAdminAllPatient";
import SuperAdminConfirmOrder from "../Component/SuperAdminDashboard/SuperAdminConfirmOrder";
import SuperAdminDashboardIndex from "../Component/SuperAdminDashboard/SuperAdminDashboardIndex";
import SuperAdminOrder from "../Component/SuperAdminDashboard/SuperAdminOrder";
import SuperAdminPatientEditProfile from "../Component/SuperAdminDashboard/SuperAdminPatientEditProfile";
import SuperAdminProductAdd from "../Component/SuperAdminDashboard/SuperAdminProductAdd";
import SuperAdminProductTable from "../Component/SuperAdminDashboard/SuperAdminProductTable";
import SuperAdminRejectOrder from "../Component/SuperAdminDashboard/SuperAdminRejectOrder";
import SuperAdminTeamForm from "../Component/SuperAdminDashboard/SuperAdminTeamForm";
import SuperAdminViewOrder from "../Component/SuperAdminDashboard/SuperAdminViewOrder";
import ChangePassword from "../Component/UserDashboard/UserDashboardEditProfile/ChangePassword";
import SuperAdminResearch from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminResearch";
import SuperAdminUserFaq from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminUserFaq";
import SuperAdminFooter from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminFooter";
import SuperAdminProductEdit from "../Component/SuperAdminDashboard/SuperAdminProductEdit";
import SuperAdminBrochure from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminBrochure";
import SuperAdminAddOrderDetails from "../Component/SuperAdminDashboard/SuperAdminAddOrderDetails";
import SuperAdminDoctorFaq from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminDoctorFaq";
import SuperAdminPatientReview from "../Component/SuperAdminDashboard/FrontEndEdit/SuperAdminPatientReview";

const SuperAdminRoute = [
  { path: "overview", Component: SuperAdminDashboardIndex },
  { path: "superadmin-allpatientlist", Component: SuperAdminAllPatient },
  { path: "superadmin-productadd", Component: SuperAdminProductAdd },
  { path: "superadmin-addorderdetails", Component: SuperAdminAddOrderDetails },
  { path: "superadmin-producttable", Component: SuperAdminProductTable },
  { path: "superadmin-contactlist", Component: ContactsList },
  { path: "superadmin-teamform", Component: SuperAdminTeamForm },
  { path: "superadmin-order", Component: SuperAdminOrder },
  {
    path: "superadmin-order-view/:id",
    Component: SuperAdminViewOrder,
  },
  { path: "superadmin-confirm-order", Component: SuperAdminConfirmOrder },
  { path: "superadmin-reject-order", Component: SuperAdminRejectOrder },

  {
    path: "superadmin-patient-edit-profile/:id",
    Component: SuperAdminPatientEditProfile,
  },

  {
    path: "edit-product/:id",
    Component: SuperAdminProductEdit,
  },
  { path: "updateHero", Component: SuperAdminHero },
  { path: "updateWhyMednyne", Component: SuperAdminWhyMedmyne },
  { path: "updateDoctorReview", Component: SuperAdminDoctorReview },
  { path: "updateGrow", Component: SuperAdminGrow },
  { path: "updateSteps", Component: SuperAdminSteps },
  { path: "updateLectures", Component: SuperAdminLectures },
  { path: "updateResearch", Component: SuperAdminResearch },
  { path: "updateBrochure", Component: SuperAdminBrochure },
  { path: "updateUserFaq", Component: SuperAdminUserFaq },
  { path: "updateDoctorFaq", Component: SuperAdminDoctorFaq },
  { path: "updatePatientReview", Component: SuperAdminPatientReview },
  { path: "updateFooter", Component: SuperAdminFooter },
  { path: "changePassword", Component: ChangePassword },
];

export default SuperAdminRoute;
