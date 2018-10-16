interface IUser {}

export class AlertService {
    public show(message: string) {}
}

export class RestService {

    public get(model: string) {
        const url = "http://api.sweetdata.com/data/" + model;
        let options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        };
        return fetch(url, options)
            .then((response) => response.json());
    }

    public post(model: string, data: any) {
        const url = "http://api.sweetdata.com/data/" + model;
        let options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        };
        return fetch(url, options)
            .then((response) => response.json());
    }

    public getUsers() {
        return this.get("user").then((data) => data.users);
    }

    public getCompanies() {
        return this.get("company").then((data) => data.companies);
    }

    public getVehicles() {
        return this.get("vehicle").then((data) => data.vehicles);
    }

    public saveUser(user) {
        return this.post("user", user).then((data) => data.user);
    }

    public saveCompany(company) {
        return this.post("company", company).then((data) => data.company);
    }

    public saveVehicle(vehicle) {
        return this.post("vehicle", vehicle).then((data) => data.vehicle);
    }
}

export class SomeUserComponent {

    users: IUser[];

    constructor(
        private restService: RestService,
        private alertService: AlertService
        ) { }

    ngOnInit(): void {
        this.restService.getUsers()
            .then((users) => {
                this.users = users;
            });
    }

    saveUser(user: IUser): void {
        this.restService.saveUser(user)
            .then((savedUser) => {
                this.alertService.show(`User ${savedUser.id} saved.`);
            });
    }

}
