import { IGlobals } from "@spt-aki/models/eft/common/IGlobals";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";

class ValensRecoilReduction implements IPostDBLoadMod
{
    private weapons: IDatabaseTables;
    private globals: IGlobals;
    private databaseServer: DatabaseServer;

    public postDBLoad(container: DependencyContainer): void
    {
        this.databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        this.weapons = this.databaseServer.getTables().templates.items;
        this.globals = this.databaseServer.getTables().globals;
        
        const weapons: IDatabaseTables = this.weapons;
        const globals = this.globals.config.Aiming;

        for (const weapon in weapons) 
        {
            const weaponData: ITemplateItem = weapons[weapon];
            if (weaponData?._props?.weapClass !== undefined)
            {
                if (weaponData._props.weapClass !== "pistol") 
                {
                    weaponData._props.CameraRecoil *= 0.20;
                    weaponData._props.RecoilForceUp *= 0.95;
                    weaponData._props.RecoilForceBack *= 0.95;
                    weaponData._props.CameraSnap = 3.35;
                }
                else 
                {
                    weaponData._props.CameraRecoil *= 0.40;
                    weaponData._props.RecoilForceUp *= 0.95;
                    weaponData._props.RecoilForceBack *= 0.95;
                    weaponData._props.CameraSnap = 3.35;
                }
            }
        }
        globals.RecoilCrank = true;
        globals.AimProceduralIntensity = 0.63;
        globals.RecoilHandDamping = 0.40;
        globals.RecoilDamping = 0.45;
        globals.RecoilConvergenceMult *= 5.5;
        globals.RecoilVertBonus = 35;
        globals.RecoilBackBonus = 85;
    }
}

module.exports = { mod: new ValensRecoilReduction() }