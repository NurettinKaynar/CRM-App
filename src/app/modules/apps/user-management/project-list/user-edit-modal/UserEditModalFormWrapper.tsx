import { useQuery } from "react-query";
import { UserEditModalForm } from "./UserEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";

const UserEditModalFormWrapper = () => {
  const { itemIdForUpdate, setItemIdForUpdate } = useListView();
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(`${QUERIES.TASK_LIST}-user-${itemIdForUpdate}`, () => {}, {
    cacheTime: 0,
    enabled: enabledQuery,
    onError: (err) => {
      setItemIdForUpdate(undefined);
      console.error(err);
    },
  });

  if (!itemIdForUpdate) {
    return (
      <UserEditModalForm isUserLoading={isLoading} user={{ id: undefined }} />
    );
  }

  if (!isLoading && !error && user) {
    return <UserEditModalForm isUserLoading={isLoading} user={user} />;
  }

  return null;
};

export { UserEditModalFormWrapper };
