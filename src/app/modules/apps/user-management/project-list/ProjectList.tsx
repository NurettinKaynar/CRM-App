import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { UsersTable } from "./table/UsersTable";
import { UserEditModal } from "./user-edit-modal/UserEditModal";
import { KTCard } from "../../../../../_metronic/helpers";
import { ToolbarWrapper } from "../../../../../_metronic/layout/components/toolbar";
import { Content } from "../../../../../_metronic/layout/components/content";

const ProjectList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  );
};

const ProjectListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        {/* <ToolbarWrapper /> */}
        <Content>
          <div className="app-content">
            <div className="app-container container-xxl">
              <ProjectList />
            </div>
          </div>
        </Content>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { ProjectListWrapper };
