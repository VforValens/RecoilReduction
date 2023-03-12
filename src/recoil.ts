import { IGlobals } from "@spt-aki/models/eft/common/IGlobals";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";
import { RecoilConfig } from "../config/ts/config";

class ValensRecoilReduction implements IPostDBLoadMod
{
    private modConfig: RecoilConfig = require("../config/config.json")
    private weapons: IDatabaseTables;
    private globals: IGlobals;
    private databaseServer: DatabaseServer;

    public postDBLoad(container: DependencyContainer): void
    {
        this.databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.weapons = this.databaseServer.getTables().templates.items;
        this.globals = this.databaseServer.getTables().globals;
        
        const globals = this.globals.config.Aiming;
        const weapons: IDatabaseTables = this.weapons;
        
        if (this.modConfig.Enabled)
        {
            // Change globals.json recoil properties.
            globals.AimProceduralIntensity = this.modConfig.Globals.AimProceduralIntensity;
            globals.RecoilBackBonus = this.modConfig.Globals.RecoilBackBonus;
            globals.RecoilConvergenceMult *= this.modConfig.Globals.RecoilConvergenceMult;
            globals.RecoilCrank = this.modConfig.Globals.RecoilCrank;
            globals.RecoilDamping = this.modConfig.Globals.RecoilDamping;
            globals.RecoilHandDamping = this.modConfig.Globals.RecoilHandDamping;
            globals.RecoilVertBonus = this.modConfig.Globals.RecoilVertBonus;

            for (const weapon in weapons)
            {
                const weaponData: ITemplateItem = weapons[weapon];
                if (weaponData?._props?.weapUseType !== undefined)
                {
                    // Iterate through each primary weapon and change its recoil attributes.
                    if (weaponData._props.weapUseType == "primary")
                    {
                        weaponData._props.CameraRecoil *= this.modConfig.Primary.CameraRecoil;            
                        weaponData._props.CameraSnap = this.modConfig.Primary.CameraSnap;
                        weaponData._props.RecoilForceBack *= this.modConfig.Primary.RecoilForceBack;
                        weaponData._props.RecoilForceUp *= this.modConfig.Primary.RecoilForceUp;
                    }
                    // Iterate through each secondary weapon and change its recoil attributes.
                    else if (weaponData?._props?.weapUseType == "secondary")
                    {
                        weaponData._props.CameraRecoil *= this.modConfig.Secondary.CameraRecoil;
                        weaponData._props.CameraSnap = this.modConfig.Secondary.CameraSnap;
                        weaponData._props.RecoilForceBack *= this.modConfig.Secondary.RecoilForceBack;
                        weaponData._props.RecoilForceUp *= this.modConfig.Secondary.RecoilForceUp;
                    }
                    else
                    {
                        logger.info(`Unexpected type: ${weaponData._props.weapUseType} found for ${weaponData._id}`);
                    }
                }
            }
        }
    }
}
module.exports = { mod: new ValensRecoilReduction() }