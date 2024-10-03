// IDoctor.ts
export interface IDoctor {
        _id: string;
        name: string;
        phone: string;
        spec: string; // Adjust based on your spec structure
        department: string;
        avatar: string;
        region: string;
        district: string;
        education: string;
        family: number;
        familyphone: string;
        worktime: number;
        gender: number;
        birthday: string; // or Date type based on your needs
      }
