package de.ulfbiallas.guestbook;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GuestbookController {

    @Autowired
    private GuestbookRepository guestbookRepository;

    @RequestMapping(value="/", method=RequestMethod.GET)
    Iterable<Entry> getEntries() {
        return guestbookRepository.findAll();
    }

    @RequestMapping(value="/", method=RequestMethod.POST, consumes="application/json")
    Entry createEntry(@RequestBody Entry entry) {
        entry.setTime(new Date());
        return guestbookRepository.save(entry);
    }

}
