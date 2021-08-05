## Google Calendar Clone Project

- 해당 프로젝트는 Google의 google calendar를 클론한 프로젝트입니다.

- 기본 스택은 server side 없이 `redux`와 `next.js`로 설계하였습니다. (css는 `tailwind.css`)

- Notion link : [링크](https://time-shame-fb8.notion.site/Clone-Google-Calendar-a7f7bb7c761f480e8f3d1c4c55888321)
- Route 53에서 구매한 도메인 link : [링크](https://clone-calendar.peration.org)

## 프로젝트 정보

### 1. 실행

- `yarn run dev` 명령어를 통해 실행

### 2. 페이지 구성

- **Login**

  - 소셜 로그인을 구성했지만, 사기 사이트 위험때문에 임시 삭제 해놓은 상태입니다.
  - 현재는 `default user`의 정보(Tom, Steve, Pery, Bucky)로 로그인하게 되어있습니다.

- **Main**

  - 기본 Google Calendar의 ui/ux를 그대로 clone해본 메인페이지입니다.
  - Year, Month, Week, Day view를 구성 예정인 상태이고, 현재는 Year, Month view만 구성되어있는 상태입니다.

### 3. 기능

- 일정 추가

- Year view

- Month view

### 4. redux 구조

redux는 모두 hash map 구조로, key를 통해 해당 key의 value들을 참조할 수 있는 방식으로 구현하였습니다.

#### **Event**

```
Event (object) : {
	[event_uuid]: {
		title (string)
		period (object) : {
			start (timestamp)
			end (timestamp)
		}
		type (string) : "default", "allDay"
		participants (object) : {
			[user_uuid] : {
				uuid (string) : [user_uuid],
				status (string) : "accept", "reject", "waiting"
				isRequired (boolean)
			},
		}
		description (string)
		host (object) : {
			uuid (string)
			calendar (string)
		}
		color (string) : "red", "pink", "yellow", "blue", "green", "purple", "gray"
		repeat (object) : {
			type (string) : "none", "repeat",
			day (array) : "monday", "tuesday", ...,
			end (timestamp - format)
			rejected (object): {
				uuid: (string) : {
					type (string) : "day", "afterAll",
					user (string)
					date (timestamp - format)
				}
			}
			deleted (object) : {
				uuid : {
					date (timestamp - format)
					type (string) : "day", "afterAll"
				}
			}
		}
		isDeleted (boolean)
		authority (array) : ["edit", "invite", "view"]
		created (timestamp)
		deleted (timestamp)
	}
}
```

#### **User**

```
User (object) : {
	[user_uuid] : {
		name (string),
		email (string),
		myCalendar (object) : {
			calendar_uuid : {
				name : calendar_name,
				color : "red",
				isChecked : true,
			},
		},
		Event (object : for custom) : {
			[event_uuid] : {
				title (string),
				description (string),
				color (string),
				isDeleted (boolean)
				rejected (object) : {
					uuid : {
						date (timestamp - format)
						type (string) : "day", "afterAll"
					}
				}
			}
		},
	},
}
```

#### **Setting**

```
Setting ( object ) {
	isToggled (boolean)
	profileModal (boolean)
	viewModal (boolean)
	viewType (string) : "yearView", "monthView", "weekView", "dayView"
	fontColor (string) : "black", "white"
	option (array) : ['weekend', 'rejected']
	participant (array) : [user_uuid]
	focusDate (timestamp)
	leftbarDate (timestamp)
}
```

### 5. 추가 예정 기능 (Demo 2)

- 일정 반복 기능
