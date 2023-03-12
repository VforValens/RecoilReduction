export interface RecoilConfig
{
    Enabled: boolean;
    Globals: Globals;
    Primary: WeaponRecoil;
    Secondary: WeaponRecoil;
}

export interface Globals
{
    AimProceduralIntensity: number;
    RecoilBackBonus: number;
    RecoilConvergenceMult: number;
    RecoilCrank: boolean;
    RecoilDamping: number;
    RecoilScaling: number;
    RecoilHandDamping: number;
    RecoilVertBonus: number;
}

export interface WeaponRecoil
{
    CameraRecoil: number;
    CameraSnap: number;
    RecoilForceBack: number;
    RecoilForceUp: number;
}