import { KTCard } from "../../../../../_metronic/helpers";
import { Content } from "../../../../../_metronic/layout/components/content";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { ListViewProvider } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersTable } from "./table/UsersTable";

const ProjectList = () => {
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
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
