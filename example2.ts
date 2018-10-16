interface IUser {}

export class AlertService {
    public show(message: string) {}
}

export class RestService {

    public sendRequest(
        model: string, 
        method: "GET" | "POST" = "GET", 
        data?: any) {
        const url = "http://api.sweetdata.com/data/" + model;
        let options: RequestInit = {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        return fetch(url, options)
            .then((response: Response) => {
                return response.json()
            })
            .then((data) => {
                if (model === "user") {
                    if (method === "GET") {
                        return data.users;
                    } else if (method === "POST") {
                        return data.user;
                    }
                } else if (model === "company") {
                    if (method === "GET") {
                        return data.companies;
                    } else if (method === "POST") {
                        return data.company;
                    }
                } else if (model === "vehicle") {
                    if (method === "GET") {
                        return data.vehicles;
                    } else if (method === "POST") {
                        return data.vehicle;
                    }
                }
                // Don't handle anything you don't know about/haven't tested.
                throw Error(`Unhandled request: ${method} to model ${model}.`);
            });
    }
}

export class SomeUserComponent {

    users: IUser[];

    constructor(
        private restService: RestService,
        private alertService: AlertService
        ) { }

    ngOnInit(): void {
        this.restService.sendRequest("User")
            .then((users) => {
                this.users = users;
            });
    }

    saveUser(user: IUser): void {
        this.restService.sendRequest("User", "POST", user)
            .then((savedUser) => {
                this.alertService.show(`User ${savedUser.id} saved.`);
            });
    }

}
