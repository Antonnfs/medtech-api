import moment from "moment";
import providers from "../../providers/providers.json" assert { type: "json" };
import {
   filterAvailableDates,
   getAllNames,
   getAllSpecialties,
   getProviderByName,
   paginateData,
   removeArrayCaseSensitivity,
} from "../services/index.js";

export const filterBySpecialty = (req, res, next) => {
   const specialty = req.query?.specialty?.toLowerCase().trim();
   if (!specialty) res.status(400).send("The specialty does not provided.");
   const specialties = getAllSpecialties(providers);
   if (!removeArrayCaseSensitivity(specialties).includes(specialty))
      res.status(400).send(
         `The specialty is not available. Available specialties: ${specialties.join(
            ", "
         )}`
      );
   req.filteredProviders = providers.filter((provider) =>
      removeArrayCaseSensitivity(provider.specialties).includes(specialty)
   );
   next();
};

export const filterByScore = (req, res, next) => {
   const { minScore } = req.query;
   if (!+minScore && +minScore !== 0)
      res.status(400).send("minScore does not provided.");
   if (Number.isNaN(+minScore))
      res.status(400).send("minScore is not a number.");
   if (+minScore < 0 || +minScore > 10)
      res.status(400).send("minScore must be between 1 and 10.");
   req.filteredProviders = req.filteredProviders
      .filter(({ score }) => score >= minScore)
      .sort((a, b) => b.score - a.score);
   next();
};

export const filterByDate = (req, res) => {
   const { date, page, limit } = req.query;
   if (!date) res.status(400).send("Date does not provided.");
   if (!moment.unix(date).isValid()) res.status(400).send("Bad date format.");
   const filteredByDate = req.filteredProviders.filter((provider) => {
      const filtered = filterAvailableDates(provider.availableDates, date);
      if (filtered.length) return provider;
   });
   const sourceData = filteredByDate.map((provider) => provider.name);
   const { data, pageCount } = paginateData(page, limit, sourceData);
   res.json(data);
   // res.json({ data, page, pageCount }); // <-- in case we want to provide pagination data
};

export const handlePostErrors = (req, res, next) => {
   const { name, date } = req.body;
   if (!name || !date)
      res.status(400).send("The name and/or date does not provided.");
   if (typeof name !== "string")
      res.status(400).send("The name must be a string.");
   const names = getAllNames(providers);
   if (!removeArrayCaseSensitivity(names).includes(name.toLowerCase()))
      res.status(400).send(
         `The name is not available. Available names: ${names.join(", ")}`
      );
   if (!moment.unix(date).isValid()) res.status(400).send("Bad date format.");
   next();
};

export const makeAppointment = (req, res) => {
   const { name, date } = req.body;
   const { availableDates } = getProviderByName(providers, name);
   const filtered = filterAvailableDates(availableDates, date);
   if (!filtered.length) {
      res.status(400).send("Date is not available.");
   } else {
      res.end("Done");
   }
};
