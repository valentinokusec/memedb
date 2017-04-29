package com.memedb.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

@ConfigurationProperties("storage")
@Service
public class StorageProperties {

    /**
     * Folder location for storing files
     */
    private String location = "D:\\test\\";

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
