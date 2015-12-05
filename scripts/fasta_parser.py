from Bio import SeqIO
import ParsingUtils

def parseFastaFormat():
    tid = {}
    wfile = "./../quant_data/gc_content.csv"
    f = open(wfile, "w")
    for seq_record in SeqIO.parse("./../transcripts.filtered.fa", "fasta"):
        # print(seq_record.id)
        # print(repr(seq_record.seq))
        # print(len(seq_record))
        tid[seq_record.id] = {}
        count = 0
        for nt in str(seq_record.seq):
            # print nt
            if nt == 'G' or nt == 'C':
                count += 1
        # print count
        # print len(str(seq_record.seq))
        gc_frac = round(float(count)/len(str(seq_record.seq)), 4)
        tid[seq_record.id]["gc_content"] = gc_frac
        f.write(seq_record.id + "," + str(gc_frac) + "\n")
    f.close()
    print len(tid)

f = ParsingUtils.readRSEMTruth("./../quant_data/rsem/rsem.new.quant.isoforms.results")
for line in f:
    print line
    break