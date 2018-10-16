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
            .then((response) => response.json());
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
            .then((data) => {
                this.users = data.users;
            });
    }

    saveUser(user: IUser): void {
        this.restService.sendRequest("User", "POST", user)
            .then((data) => {
                this.alertService.show(`User ${data.user.id} saved.`);
            });
    }

}
