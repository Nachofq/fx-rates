import fixer from "./fixer";

export type Providers = "fixer"; // Add >> | "newProvider" << for more allowed providers

export default (provider: Providers) => {
  switch (provider) {
    case "fixer":
      return fixer;
  }
};
