import { container } from "tsyringe";
import { DayjsDateProvider } from "./DayjsProvider/DayjsDateProvider";
import { IDateProvider } from "./DayjsProvider/IDateProvider";


container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)