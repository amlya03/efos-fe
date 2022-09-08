package co.id.megasyariah.efo.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "contoh")
    private String contoh;

    @Column(name = "nama")
    private String nama;

    @Column(name = "kelas")
    private String kelas;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Book id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContoh() {
        return this.contoh;
    }

    public Book contoh(String contoh) {
        this.setContoh(contoh);
        return this;
    }

    public void setContoh(String contoh) {
        this.contoh = contoh;
    }

    public String getNama() {
        return this.nama;
    }

    public Book nama(String nama) {
        this.setNama(nama);
        return this;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getKelas() {
        return this.kelas;
    }

    public Book kelas(String kelas) {
        this.setKelas(kelas);
        return this;
    }

    public void setKelas(String kelas) {
        this.kelas = kelas;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Book)) {
            return false;
        }
        return id != null && id.equals(((Book) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", contoh='" + getContoh() + "'" +
            ", nama='" + getNama() + "'" +
            ", kelas='" + getKelas() + "'" +
            "}";
    }
}
