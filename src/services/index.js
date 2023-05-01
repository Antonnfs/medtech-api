export const removeArrayCaseSensitivity = (array) =>
   array.map((item) => item.toLowerCase());

export const getAllSpecialties = (providers) => {
   const specialtiesArray = providers
      .map((provider) => provider.specialties)
      .flat();
   const uniqueSpecialtiesArray = Array.from(new Set(specialtiesArray));
   return uniqueSpecialtiesArray;
};

export const getAllNames = (providers) => {
   const namesArray = providers.map((provider) => provider.name);
   return namesArray;
};

export const getProviderByName = (providers, name) =>
   providers.find(
      (provider) => provider.name.toLowerCase() === name.toLowerCase()
   );

export const filterAvailableDates = (availableDates, date) =>
   availableDates.filter(
      (dates) =>
         Number(dates.from) <= Number(date) && Number(date) <= Number(dates.to)
   );

export const paginateData = (page = 1, limit = 10, sourceData = []) => {
   const pageCount = Math.ceil(sourceData.length / limit) || 1;
   if (page > pageCount) page = pageCount;
   const data = sourceData.slice(page * limit - limit, page * limit);
   return { data, pageCount };
};
