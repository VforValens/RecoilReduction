import { Config, IGlobals } from "@spt-aki/models/eft/common/IGlobals";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";

class ValensRecoilReduction implements IPostDBLoadMod
{
    private weapons: IDatabaseTables;
    private globals: IGlobals;

    public postDBLoad(): void
    {
        const weapons: IDatabaseTables = this.weapons;
        const globals: Config = this.globals.config;

        for (const weapon in weapons) 
        {
            const weaponData: ITemplateItem = weapons[weapon];
            if (weaponData._props.weapClass != null && weaponData._props.weapClass !== undefined)
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
        globals.Aiming.RecoilCrank = true;
        globals.Aiming.AimProceduralIntensity = 0.63;
        globals.Aiming.RecoilHandDamping = 0.40;
        globals.Aiming.RecoilDamping = 0.45;
        globals.Aiming.RecoilConvergenceMult *= 5.5;
        globals.Aiming.RecoilVertBonus = 35;
        globals.Aiming.RecoilBackBonus = 85;
    }
}

module.exports = { mod: new ValensRecoilReduction() }