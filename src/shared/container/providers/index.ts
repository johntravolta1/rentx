import { container } from "tsyringe";
import { DayjsDateProvider } from "./DayjsProvider/DayjsDateProvider";
import { IDateProvider } from "./DayjsProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";




container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)


container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider())

