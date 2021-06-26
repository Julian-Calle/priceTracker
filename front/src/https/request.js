import { fetchApi, requestMethods } from "../shared/utils/fetchFunctions";
const endpoints = {
  new: "/new",
  delete: "/delete/",
  items: "/items",
  update: "/update",
};

export async function getItems() {
  const response = await fetchApi(`${endpoints.items}`, {
    method: requestMethods.get,
  });
  if (response.status === "ok") {
    return response.data;
  }
  // console.log(response);
}

export async function deleteItem(id) {
  const response = await fetchApi(`${endpoints.delete}/${id}`, {
    method: requestMethods.delete,
  });
  if (response.status === "ok") {
    return response.data;
  }
  console.log(response);
}

// export async function newItem(task, color, type, timeLimit) {

//     const response = await fetchApi(`${endpoints.createTask}`, {
//       method: requestMethods.post,
//       body: { task, color, type, timeLimit },
//     });
//     if (response.status === "ok") {
//       return response.data;
//     }
//     console.log(response);
//   }

export async function updateitem(id, price) {
  const response = await fetchApi(
    `${endpoints.update}?price=${price}&id=${id}`,
    {
      method: requestMethods.post,
    }
  );
  if (response.status === "ok") {
    return response.data;
  }
  console.log(response);
}
