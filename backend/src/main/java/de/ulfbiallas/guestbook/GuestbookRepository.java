package de.ulfbiallas.guestbook;

import org.springframework.data.repository.CrudRepository;

public interface GuestbookRepository extends CrudRepository<Entry, Long> {

}
