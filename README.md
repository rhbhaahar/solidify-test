# Test smart home application for solidify

## Run application

```bash
npm run start
```

After running you can check home state at http://127.0.0.1:8081/ also additional info logs will appear in console

## Config keys

**openWeatherApi** - latitude and longitude of place and openWeatherApi key

**initialHomeState** - initial parameters for place

**smartDevices** - list of connected or disconnected smart devices

**updateHomeStateInterval** - interval for core of smart home to check weather

**homeBackTime** - time when owner come back home in HH:MM format
