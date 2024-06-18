import type { Paginate, Payload, Single } from '~/utils/models';

const useResourceService = <Resource, ResourceCriteria>(url: string) => {
  const getItems = async (query?: { page?: number; limit?: number }) => {
    const { data, error } = await useCustomFetch(`/api/${url}`, { query });

    const payload = data as Paginate<Resource> | null;

    return { data: payload, error };
  };

  const getItem = async (id: string) => {
    const { data, error } = await useCustomFetch(`/api/${url}/${id}`);

    const payload = data as Single<Resource> | null;

    return { data: payload, error };
  };

  const deleteItems = async (id: string) => {
    const { data, error } = await useCustomFetch(`/api/${url}/${id}`, {
      method: 'DELETE',
    });

    const payload = data as Payload | null;

    return { data: payload, error };
  };

  const createItem = async (body: ResourceCriteria) => {
    const { data, error } = await useCustomFetch(`/api/${url}`, {
      method: 'POST',
      body,
    });

    const payload = data as Single<Resource> | null;

    return { data: payload, error };
  };

  const updateItem = async (id: string, body: ResourceCriteria) => {
    const { data, error } = await useCustomFetch(`/api/${url}/${id}`, {
      method: 'PUT',
      body,
    });

    const payload = data as Single<Resource> | null;

    return { data: payload, error };
  };

  return { getItems, deleteItems, createItem, getItem, updateItem };
};

export default useResourceService;
