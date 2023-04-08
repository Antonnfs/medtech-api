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

export const paginateData = (req, sourceData = []) => {
   const limit = parseInt(req.query?.limit) || 10;
   const pageCount = Math.ceil(sourceData.length / limit) || 1;
   let page = parseInt(req.query.page) || 1;
   if (page > pageCount) page = pageCount;
   const data = sourceData.slice(page * limit - limit, page * limit);
   return { data, page, pageCount };
};
