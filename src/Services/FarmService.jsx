

import axios from 'axios';

const FARM_URL='http://localhost:8000/farmverse/farm';
const ID_URL = 'http://localhost:8000/farmverse/farm-id';



    @PostMapping("/farm")
    public void addFarm(@RequestBody Farm farm) {
        // TODO Auto-generated method stub
        String username=userService.getUserId();
        farm.setUsername(username);
        farmDao.addFarm(farm);

    }

    @PutMapping("/farm")
    public void updateFarm(@RequestBody Farm farm) {
        farmDao.addFarm(farm);
    }

    @GetMapping("/farm/{id}")
    public Farm getFarmById(@PathVariable Long id) {
        // TODO Auto-generated method stub
        return farmDao.getFarmById(id);
    }

    @GetMapping("/farm")
    public List<Farm> getFarmsByUsername() {

        String username=userService.getUserId();
        return farmDao.getFarmsByUsername(username);

    }

    @DeleteMapping("/farm/{id}")
    public void deleteFarmById(@PathVariable Long id) {
        // TODO Auto-generated method stub
        farmDao.deleteFarmById(id);
    }

    @GetMapping("/farm-id")
    public Long generateFarmId() {

        return service.generateFarmId();
    }
