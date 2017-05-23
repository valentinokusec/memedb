package com.memedb.forms;

import java.util.ArrayList;
import java.util.List;

public class MeMeForm {
	
	public String header;
	
	public List<String> tags = new ArrayList<String>();
	


	
	
	public MeMeForm() {
		super();

	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	
	
	

}
