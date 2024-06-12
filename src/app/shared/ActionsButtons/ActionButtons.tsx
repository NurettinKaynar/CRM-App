import { Dropdown } from "react-bootstrap";

interface ActionButtonsInterface {
  onClickEdit: (clicked: boolean) => void;
  onClickDelete: (clicked: boolean) => void;
}

const ActionButtons = ({
  onClickEdit,
  onClickDelete,
}: ActionButtonsInterface) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="light"
        className="btn btn-light btn-active-light-primary btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end">
        İşlemler
      </Dropdown.Toggle>

      <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4">
        <Dropdown.Item
          className="menu-item px-3"
          onClick={() => onClickEdit(true)}>
          <a className="menu-link px-3">Düzenle</a>
        </Dropdown.Item>
        <Dropdown.Item
          className="menu-item px-3"
          onClick={() => onClickDelete(true)}>
          <a className="menu-link px-3">Sil</a>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionButtons;
