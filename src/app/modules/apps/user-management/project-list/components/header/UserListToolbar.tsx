import { KTIcon } from "../../../../../../../_metronic/helpers";
import { CreateAppModal } from "../../../../../../../_metronic/partials";
import { useListView } from "../../core/ListViewProvider";
import { UsersListFilter } from "./UsersListFilter";
import React, { useState } from "react";
const UsersListToolbar = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const { setItemIdForUpdate } = useListView();
  const openAddUserModal = () => {
    setItemIdForUpdate(null);
  };

  return (
    <div
      className="d-flex justify-content-end"
      data-kt-user-table-toolbar="base">
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      <button type="button" className="btn btn-light-primary me-3">
        <KTIcon iconName="exit-up" className="fs-2" />
        Çıktı Al
      </button>
      {/* end::Export */}

      {/* begin::Add user */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowCreateAppModal(true)}>
        <KTIcon iconName="plus" className="fs-2" />
        Proje Ekle
      </button>
      {/* end::Add user */}
      <CreateAppModal
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
      />
    </div>
  );
};

export { UsersListToolbar };
