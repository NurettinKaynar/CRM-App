import { FC, useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import moment from "moment";
import { Link, useLocation, useParams } from "react-router-dom";
import { KTCard, KTCardBody, KTIcon } from "../../../../_metronic/helpers";
import { getAllProjects } from "../../core/_request";

const ProjectDetailsHeader: FC = () => {
  let { id } = useParams();
  console.log("id geldi",id);
  
  const location = useLocation();
  const [totalProjectCount, setTotalProjectCount] = useState(0);
  const [totalActiveProjectCount, setTotalActiveProjectCount] = useState(0);
  const [totalCompletedProjectCount, setTotalCompletedProjectCount] = useState(0);
  const [ProjectList, setTotalProjectList] = useState<any[]>([]);

  const handleGetTotalProjects = () => {

    getAllProjects().then((res: AxiosResponse<any[]>) => {
      if (res.status === 200) {
        console.log(res.data);
        
        setTotalProjectCount(res.data.length);
        setTotalProjectList(res.data);

      }
    });
  };

  const handleActiveProjectCount=()=>{
    const completedProjectList=ProjectList.filter(x=>x.isCompleted)
    setTotalCompletedProjectCount(completedProjectList.length);
  }
  const handleNotCompletedProjectCount=()=>{
    const notCompleted=ProjectList.filter(x=>!x.isCompleted)
    setTotalActiveProjectCount(notCompleted.length);
  }

  useEffect(() => {
    handleGetTotalProjects();
  }, []);
  useEffect(() => {
  if(ProjectList){
    handleActiveProjectCount()
    handleNotCompletedProjectCount()
  }
  }, [ProjectList]);
  return (
   <KTCard>
      <KTCardBody className=" card-body pt-9 pb-0">
      {/* <!--begin::Details--> */}
      <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
            {/* <!--begin::Image--> */}
            <div className="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
                <img className="mw-50px mw-lg-75px" src="/metronic8/demo1/assets/media/svg/brand-logos/volicity-9.svg" alt="image"/>
            </div>
            {/* <!--end::Image--> */}

            {/* <!--begin::Wrapper--> */}
            <div className="flex-grow-1">
                {/* <!--begin::Head--> */}
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                    {/* <!--begin::Details--> */}
                    <div className="d-flex flex-column">
                        {/* <!--begin::Status--> */}
                        <div className="d-flex align-items-center mb-1">
                            <a href="#" className="text-gray-800 text-hover-primary fs-2 fw-bold me-3">CRM Dashboard</a>
                            <span className="badge badge-light-success me-auto">In Progress</span>
                        </div>
                        {/* <!--end::Status--> */}

                        {/* <!--begin::Description--> */}
                        <div className="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-500">
                            #1 Tool to get started with Web Apps any Kind &amp; size
                        </div>
                        {/* <!--end::Description--> */}
                    </div>
                    {/* <!--end::Details--> */}

                    {/* <!--begin::Actions--> */}
                    <div className="d-flex mb-4">
                        <a href="#" className="btn btn-sm btn-bg-light btn-active-color-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_users_search">Add User</a>

                        <a href="#" className="btn btn-sm btn-primary me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_new_target">Add Target</a>

                        {/* <!--begin::Menu--> */}
                        <div className="me-0">
                            <button className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                <i className="ki-solid ki-dots-horizontal fs-2x"></i>                            </button>
                            
{/* <!--begin::Menu 3--> */}
<div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3" data-kt-menu="true">
    {/* <!--begin::Heading--> */}
    <div className="menu-item px-3">
        <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">
            Payments
        </div>
    </div>
    {/* <!--end::Heading--> */}

    {/* <!--begin::Menu item--> */}
    <div className="menu-item px-3">
        <a href="#" className="menu-link px-3">
            Create Invoice
        </a>
    </div>
    {/* <!--end::Menu item--> */}

    {/* <!--begin::Menu item--> */}
    <div className="menu-item px-3">
        <a href="#" className="menu-link flex-stack px-3">
            Create Payment

            <span className="ms-2" data-bs-toggle="tooltip" aria-label="Specify a target name for future usage and reference" data-bs-original-title="Specify a target name for future usage and reference" data-kt-initialized="1">
                <i className="ki-duotone ki-information fs-6"><span className="path1"></span><span className="path2"></span><span className="path3"></span></i>            </span>
        </a>
    </div>
    {/* <!--end::Menu item--> */}

    {/* <!--begin::Menu item--> */}
    <div className="menu-item px-3">
        <a href="#" className="menu-link px-3">
            Generate Bill
        </a>
    </div>
    {/* <!--end::Menu item--> */}

    {/* <!--begin::Menu item--> */}
    <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-end">
        <a href="#" className="menu-link px-3">
            <span className="menu-title">Subscription</span>
            <span className="menu-arrow"></span>
        </a>

        {/* <!--begin::Menu sub--> */}
        <div className="menu-sub menu-sub-dropdown w-175px py-4">
            {/* <!--begin::Menu item--> */}
            <div className="menu-item px-3">
                <a href="#" className="menu-link px-3">
                    Plans
                </a>
            </div>
            {/* <!--end::Menu item--> */}

            {/* <!--begin::Menu item--> */}
            <div className="menu-item px-3">
                <a href="#" className="menu-link px-3">
                    Billing
                </a>
            </div>
            {/* <!--end::Menu item--> */}

            {/* <!--begin::Menu item-->             */}
            <div className="menu-item px-3">
                <a href="#" className="menu-link px-3">
                    Statements
                </a>
            </div>
            {/* <!--end::Menu item--> */}
            
            {/* <!--begin::Menu separator--> */}
            <div className="separator my-2"></div>
            {/* <!--end::Menu separator--> */}

            {/* <!--begin::Menu item-->             */}
            <div className="menu-item px-3">
                <div className="menu-content px-3">
                    {/* <!--begin::Switch-->       */}
                    <label className="form-check form-switch form-check-custom form-check-solid">
                        {/* <!--begin::Input-->    */}
                        <input className="form-check-input w-30px h-20px" type="checkbox" value="1" name="notifications"/>
                        {/* <!--end::Input-->    */}

                        {/* <!--end::Label-->    */}
                        <span className="form-check-label text-muted fs-6">
                            Recuring
                        </span>
                        {/* <!--end::Label-->    */}
                    </label>
                    {/* <!--end::Switch-->    */}
                </div>
            </div>
            {/* <!--end::Menu item--> */}
        </div>
        {/* <!--end::Menu sub--> */}
    </div>
    {/* <!--end::Menu item--> */}

    {/* <!--begin::Menu item--> */}
    <div className="menu-item px-3 my-1">
        <a href="#" className="menu-link px-3">
            Settings
        </a>
    </div>
    {/* <!--end::Menu item--> */}
</div>
{/* <!--end::Menu 3--> */}
                        </div>
                        {/* <!--end::Menu--> */}
                    </div>
                    {/* <!--end::Actions--> */}
                </div>
                {/* <!--end::Head--> */}

                {/* <!--begin::Info--> */}
                <div className="d-flex flex-wrap justify-content-start">
                    {/* <!--begin::Stats--> */}
                    <div className="d-flex flex-wrap">
                        {/* <!--begin::Stat--> */}
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                            {/* <!--begin::Number--> */}
                            <div className="d-flex align-items-center">
                                <div className="fs-4 fw-bold">29 Jan, 2024</div>
                            </div>
                            {/* <!--end::Number--> */}

                            {/* <!--begin::Label--> */}
                            <div className="fw-semibold fs-6 text-gray-500">Due Date</div>
                            {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Stat--> */}

                        {/* <!--begin::Stat--> */}
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                            {/* <!--begin::Number--> */}
                            <div className="d-flex align-items-center">
                                <i className="ki-duotone ki-arrow-down fs-3 text-danger me-2"><span className="path1"></span><span className="path2"></span></i>                                <div className="fs-4 fw-bold counted" data-kt-countup="true" data-kt-countup-value="75" data-kt-initialized="1">75</div>
                            </div>
                            {/* <!--end::Number--> */}

                            {/* <!--begin::Label--> */}
                            <div className="fw-semibold fs-6 text-gray-500">Open Tasks</div>
                            {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Stat--> */}

                        {/* <!--begin::Stat--> */}
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                            {/* <!--begin::Number--> */}
                            <div className="d-flex align-items-center">
                                <i className="ki-duotone ki-arrow-up fs-3 text-success me-2"><span className="path1"></span><span className="path2"></span></i>                                <div className="fs-4 fw-bold counted" data-kt-countup="true" data-kt-countup-value="15000" data-kt-countup-prefix="$" data-kt-initialized="1">$15,000</div>
                            </div>
                            {/* <!--end::Number-->                                 */}

                            {/* <!--begin::Label--> */}
                            <div className="fw-semibold fs-6 text-gray-500">Budget Spent</div>
                            {/* <!--end::Label--> */}
                        </div>
                        {/* <!--end::Stat--> */}
                    </div>
                    {/* <!--end::Stats-->

                    <!--begin::Users--> */}
                    <div className="symbol-group symbol-hover mb-3">
                                                    {/* <!--begin::User--> */}
                            <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Alan Warden" data-kt-initialized="1">
                                                                    <span className="symbol-label bg-warning text-inverse-warning fw-bold">A</span>
                                                            </div>
                            {/* <!--end::User-->
                                                    <!--begin::User--> */}
                            <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" aria-label="Michael Eberon" data-bs-original-title="Michael Eberon" data-kt-initialized="1">
                                                                    <img alt="Pic" src="/metronic8/demo1/assets/media/avatars/300-11.jpg"/>
                                                            </div>
                            {/* <!--end::User-->
                                                    <!--begin::User--> */}
                            <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" aria-label="Michelle Swanston" data-bs-original-title="Michelle Swanston" data-kt-initialized="1">
                                                                    <img alt="Pic" src="/metronic8/demo1/assets/media/avatars/300-7.jpg"/>
                                                            </div>
                            {/* <!--end::User-->
                                                    <!--begin::User--> */}
                            <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" aria-label="Francis Mitcham" data-bs-original-title="Francis Mitcham" data-kt-initialized="1">
                                                                    <img alt="Pic" src="/metronic8/demo1/assets/media/avatars/300-20.jpg"/>
                                                            </div>
                            {/* <!--end::User-->
                                                    <!--begin::User--> */}
                            <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Susan Redwood" data-kt-initialized="1">
                                                                    <span className="symbol-label bg-primary text-inverse-primary fw-bold">S</span>
                                                            {/* </div>
                            <!--end::User-->
                                                    <!--begin::User--> */}
                            <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" aria-label="Melody Macy" data-bs-original-title="Melody Macy" data-kt-initialized="1">
                                                                    <img alt="Pic" src="/metronic8/demo1/assets/media/avatars/300-2.jpg"/>
                                                            </div>
                            {/* <!--end::User-->
                                                    <!--begin::User--> */}
                            <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Perry Matthew" data-kt-initialized="1">
                                                                    <span className="symbol-label bg-info text-inverse-info fw-bold">P</span>
                                                            </div>
                            {/* <!--end::User-->
                                                    <!--begin::User--> */}
                            <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" aria-label="Barry Walter" data-bs-original-title="Barry Walter" data-kt-initialized="1">
                                                                    <img alt="Pic" src="/metronic8/demo1/assets/media/avatars/300-12.jpg"/>
                                                            </div>
                            {/* <!--end::User-->
                        
                        <!--begin::All users--> */}
                        <a href="#" className="symbol symbol-35px symbol-circle" data-bs-toggle="modal" data-bs-target="#kt_modal_view_users">
                            <span className="symbol-label bg-dark text-inverse-dark fs-8 fw-bold" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-original-title="View more users" data-kt-initialized="1">+42</span>
                        </a>
                        {/* <!--end::All users--> */}
                    </div>
                    {/* <!--end::Users--> */}
                </div>
                {/* <!--end::Info--> */}
            </div>
            {/* <!--end::Wrapper--> */}
        </div>
        {/* <!--end::Details--> */}

        <div className="separator"></div>

        {/* <!--begin::Nav--> */}
  
        {/* <!--end::Nav--> */}
    </div>
      </KTCardBody>


   </KTCard>
  );
};

export { ProjectDetailsHeader };

