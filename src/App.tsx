import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Search, Plus, X, Save, Edit3, Calendar, Clock, User, ChevronRight, Home, StickyNote, Microscope, Dna, Palette, ChevronDown, ChevronUp } from 'lucide-react';

interface Note {
  id: string;
  program: string;
  subject: string;
  topic: string;
  subtopic?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface SyllabusItem {
  name: string;
  topics: string[];
  subtopics?: { [key: string]: string[] };
}

interface Program {
  name: string;
  icon: React.ReactNode;
  color: string;
  subjects: SyllabusItem[];
}

interface Theme {
  name: string;
  gradient: string;
  primary: string;
}

const themes: Theme[] = [
  { name: 'Warm Amber', gradient: 'from-amber-50 to-orange-100', primary: 'amber' },
  { name: 'Cool Blue', gradient: 'from-blue-50 to-indigo-100', primary: 'blue' },
  { name: 'Fresh Green', gradient: 'from-green-50 to-emerald-100', primary: 'green' },
  { name: 'Purple Dream', gradient: 'from-purple-50 to-violet-100', primary: 'purple' },
  { name: 'Rose Garden', gradient: 'from-rose-50 to-pink-100', primary: 'rose' },
  { name: 'Slate Modern', gradient: 'from-slate-50 to-gray-100', primary: 'slate' }
];

const programs: Program[] = [
  {
    name: "M.Sc. Biotechnology",
    icon: <Microscope className="w-5 h-5" />,
    color: "emerald",
    subjects: [
      {
        name: "Biochemistry and Molecular Biology",
        topics: [
          "Protein Structure and Function",
          "Enzyme Kinetics and Regulation",
          "Metabolic Pathways",
          "Gene Expression and Regulation",
          "DNA Replication and Repair",
          "RNA Processing and Translation",
          "Cell Signaling Mechanisms"
        ],
        subtopics: {
          "Protein Structure and Function": [
            "Primary Structure",
            "Secondary Structure",
            "Tertiary Structure",
            "Quaternary Structure",
            "Protein Folding",
            "Protein Domains"
          ],
          "Enzyme Kinetics and Regulation": [
            "Michaelis-Menten Kinetics",
            "Competitive Inhibition",
            "Non-competitive Inhibition",
            "Allosteric Regulation",
            "Covalent Modification"
          ],
          "Metabolic Pathways": [
            "Glycolysis",
            "Citric Acid Cycle",
            "Electron Transport Chain",
            "Gluconeogenesis",
            "Fatty Acid Metabolism"
          ]
        }
      },
      {
        name: "Cell Biology and Genetics",
        topics: [
          "Cell Structure and Organization",
          "Cell Division and Cell Cycle",
          "Membrane Biology",
          "Cytoskeleton and Cell Motility",
          "Mendelian Genetics",
          "Population Genetics",
          "Molecular Genetics",
          "Genetic Engineering Techniques"
        ],
        subtopics: {
          "Cell Structure and Organization": [
            "Nucleus",
            "Mitochondria",
            "Endoplasmic Reticulum",
            "Golgi Apparatus",
            "Ribosomes",
            "Lysosomes"
          ],
          "Cell Division and Cell Cycle": [
            "G1 Phase",
            "S Phase",
            "G2 Phase",
            "Mitosis",
            "Meiosis",
            "Cell Cycle Checkpoints"
          ]
        }
      }
    ]
  },
  {
    name: "M.Sc. Bioinformatics",
    icon: <Dna className="w-5 h-5" />,
    color: "blue",
    subjects: [
      {
        name: "Fundamentals of Bioinformatics",
        topics: [
          "Introduction to Bioinformatics",
          "Biological Databases",
          "Sequence Formats",
          "Data Mining Concepts",
          "Information Theory",
          "Computational Biology Overview",
          "Bioinformatics Tools",
          "Web Resources"
        ],
        subtopics: {
          "Introduction to Bioinformatics": [
            "History of Bioinformatics",
            "Applications in Biology",
            "Computational Methods",
            "Data Types",
            "Software Tools",
            "Career Opportunities"
          ],
          "Biological Databases": [
            "NCBI",
            "UniProt",
            "PDB",
            "EMBL",
            "GenBank",
            "Database Design"
          ],
          "Sequence Formats": [
            "FASTA Format",
            "GenBank Format",
            "EMBL Format",
            "GFF Format",
            "SAM/BAM Format"
          ]
        }
      },
      {
        name: "Programming and Algorithms",
        topics: [
          "Python Programming",
          "BioPython Library",
          "Perl for Bioinformatics",
          "Algorithm Design",
          "Data Structures",
          "Dynamic Programming",
          "Graph Algorithms",
          "Complexity Analysis"
        ],
        subtopics: {
          "Python Programming": [
            "Basic Syntax",
            "Data Types",
            "Control Structures",
            "Functions",
            "Object-Oriented Programming",
            "File Handling",
            "Error Handling"
          ],
          "BioPython Library": [
            "Sequence Objects",
            "SeqIO Module",
            "Alignment Tools",
            "Phylogenetics",
            "Database Access",
            "Graphics"
          ],
          "Algorithm Design": [
            "Divide and Conquer",
            "Greedy Algorithms",
            "Backtracking",
            "Branch and Bound",
            "Approximation Algorithms"
          ]
        }
      },
      {
        name: "Molecular Biology for Bioinformatics",
        topics: [
          "Central Dogma",
          "DNA Structure and Function",
          "RNA Types and Functions",
          "Protein Structure",
          "Gene Regulation",
          "Molecular Evolution",
          "Genomic Organization",
          "Epigenetics"
        ],
        subtopics: {
          "Central Dogma": [
            "DNA Replication",
            "Transcription",
            "Translation",
            "Reverse Transcription",
            "RNA Processing"
          ],
          "DNA Structure and Function": [
            "Double Helix",
            "Base Pairing",
            "DNA Packaging",
            "Chromatin Structure",
            "DNA Repair Mechanisms"
          ]
        }
      },
      {
        name: "Sequence Analysis",
        topics: [
          "Sequence Alignment",
          "BLAST and FASTA",
          "Multiple Sequence Alignment",
          "Phylogenetic Analysis",
          "Sequence Motifs",
          "Pattern Recognition",
          "Homology Modeling",
          "Evolutionary Analysis"
        ],
        subtopics: {
          "Sequence Alignment": [
            "Pairwise Alignment",
            "Global Alignment",
            "Local Alignment",
            "Scoring Matrices",
            "Gap Penalties"
          ],
          "BLAST and FASTA": [
            "BLAST Algorithm",
            "BLAST Variants",
            "FASTA Algorithm",
            "E-values",
            "Statistical Significance"
          ]
        }
      },
      {
        name: "Structural Bioinformatics",
        topics: [
          "Protein Structure Prediction",
          "Molecular Modeling",
          "Protein Folding",
          "Structure Validation",
          "Molecular Dynamics",
          "Drug Design",
          "Protein-Protein Interactions",
          "Structural Databases"
        ],
        subtopics: {
          "Protein Structure Prediction": [
            "Ab Initio Methods",
            "Homology Modeling",
            "Threading",
            "Secondary Structure Prediction",
            "Fold Recognition"
          ],
          "Molecular Modeling": [
            "Force Fields",
            "Energy Minimization",
            "Conformational Analysis",
            "Docking Studies"
          ]
        }
      },
      {
        name: "Genomics and Proteomics",
        topics: [
          "Genome Sequencing",
          "Genome Assembly",
          "Gene Annotation",
          "Comparative Genomics",
          "Proteome Analysis",
          "Mass Spectrometry Data",
          "Functional Genomics",
          "Systems Biology"
        ],
        subtopics: {
          "Genome Sequencing": [
            "Sanger Sequencing",
            "Next-Generation Sequencing",
            "Third-Generation Sequencing",
            "Quality Control",
            "Data Processing"
          ],
          "Genome Assembly": [
            "De Novo Assembly",
            "Reference-Based Assembly",
            "Assembly Algorithms",
            "Scaffolding",
            "Gap Filling"
          ]
        }
      },
      {
        name: "Machine Learning in Bioinformatics",
        topics: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Neural Networks",
          "Support Vector Machines",
          "Classification Algorithms",
          "Clustering Methods",
          "Feature Selection",
          "Model Validation"
        ],
        subtopics: {
          "Supervised Learning": [
            "Decision Trees",
            "Random Forest",
            "Linear Regression",
            "Logistic Regression",
            "Naive Bayes"
          ],
          "Neural Networks": [
            "Perceptron",
            "Multi-layer Perceptron",
            "Convolutional Neural Networks",
            "Recurrent Neural Networks",
            "Deep Learning"
          ]
        }
      },
      {
        name: "Database Design and Management",
        topics: [
          "Database Concepts",
          "SQL for Bioinformatics",
          "NoSQL Databases",
          "Data Warehousing",
          "Database Design",
          "Data Integration",
          "Web Databases",
          "Cloud Computing"
        ],
        subtopics: {
          "Database Concepts": [
            "Relational Model",
            "Entity-Relationship Model",
            "Normalization",
            "ACID Properties",
            "Transactions"
          ],
          "SQL for Bioinformatics": [
            "Basic Queries",
            "Joins",
            "Subqueries",
            "Stored Procedures",
            "Indexing"
          ]
        }
      },
      {
        name: "Biostatistics and Data Analysis",
        topics: [
          "Statistical Methods",
          "Hypothesis Testing",
          "Regression Analysis",
          "Multivariate Analysis",
          "Experimental Design",
          "R Programming",
          "Data Visualization",
          "Statistical Software"
        ],
        subtopics: {
          "Statistical Methods": [
            "Descriptive Statistics",
            "Probability Distributions",
            "Confidence Intervals",
            "Correlation Analysis",
            "ANOVA"
          ],
          "R Programming": [
            "R Basics",
            "Data Manipulation",
            "Statistical Functions",
            "Graphics",
            "Bioconductor"
          ]
        }
      },
      {
        name: "Research Project",
        topics: [
          "Project Planning",
          "Literature Survey",
          "Methodology Design",
          "Data Collection",
          "Analysis and Results",
          "Thesis Writing",
          "Presentation Skills",
          "Publication Process"
        ],
        subtopics: {
          "Project Planning": [
            "Problem Identification",
            "Objective Setting",
            "Timeline Creation",
            "Resource Planning",
            "Risk Assessment"
          ],
          "Literature Survey": [
            "Database Searching",
            "Citation Management",
            "Critical Analysis",
            "Review Writing",
            "Gap Identification"
          ]
        }
      }
    ]
  }
];

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState<Program>(programs[1]); // Default to Bioinformatics
  const [currentView, setCurrentView] = useState<'syllabus' | 'notes' | 'editor'>('syllabus');
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [editorContext, setEditorContext] = useState<{program: string, subject: string, topic: string, subtopic?: string} | null>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<{[key: string]: boolean}>({});

  // Load notes and theme from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('ouatNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    
    const savedTheme = localStorage.getItem('ouatTheme');
    if (savedTheme) {
      const theme = themes.find(t => t.name === savedTheme) || themes[0];
      setCurrentTheme(theme);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('ouatNotes', JSON.stringify(notes));
  }, [notes]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('ouatTheme', currentTheme.name);
  }, [currentTheme]);

  const toggleTopicExpansion = (subjectName: string, topicName: string) => {
    const key = `${subjectName}-${topicName}`;
    setExpandedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const openNoteEditor = (program: string, subject: string, topic: string, subtopic?: string, existingNote?: Note) => {
    setEditorContext({ program, subject, topic, subtopic });
    if (existingNote) {
      setEditingNote(existingNote);
      setEditorContent(existingNote.content);
    } else {
      setEditingNote(null);
      setEditorContent('');
    }
    setCurrentView('editor');
  };

  const saveNote = () => {
    if (!editorContext || !editorContent.trim()) return;

    const now = new Date().toISOString();
    
    if (editingNote) {
      // Update existing note
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id 
          ? { ...note, content: editorContent, updatedAt: now }
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        program: editorContext.program,
        subject: editorContext.subject,
        topic: editorContext.topic,
        subtopic: editorContext.subtopic,
        content: editorContent,
        createdAt: now,
        updatedAt: now
      };
      setNotes(prev => [...prev, newNote]);
    }

    // Close editor and return to syllabus
    setCurrentView('syllabus');
    setEditorContent('');
    setEditorContext(null);
    setEditingNote(null);
  };

  const cancelEditor = () => {
    setCurrentView('syllabus');
    setEditorContent('');
    setEditorContext(null);
    setEditingNote(null);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const hasNote = (program: string, subject: string, topic: string, subtopic?: string) => {
    return notes.some(note => 
      note.program === program && 
      note.subject === subject && 
      note.topic === topic &&
      note.subtopic === subtopic
    );
  };

  const getNote = (program: string, subject: string, topic: string, subtopic?: string) => {
    return notes.find(note => 
      note.program === program && 
      note.subject === subject && 
      note.topic === topic &&
      note.subtopic === subtopic
    );
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.subtopic && note.subtopic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (currentView === 'editor') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient}`}>
        {/* Editor Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={cancelEditor}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{editorContext?.program}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span>{editorContext?.subject}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-medium text-gray-800">{editorContext?.topic}</span>
                  {editorContext?.subtopic && (
                    <>
                      <ChevronRight className="w-4 h-4" />
                      <span className="font-medium text-blue-600">{editorContext.subtopic}</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={saveNote}
                disabled={!editorContent.trim()}
                className={`flex items-center space-x-2 bg-${currentTheme.primary}-600 text-white px-4 py-2 rounded-lg hover:bg-${currentTheme.primary}-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                <Save className="w-4 h-4" />
                <span>{editingNote ? 'Update Note' : 'Save Note'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className={`bg-${currentTheme.primary}-50 px-6 py-3 border-b border-${currentTheme.primary}-200`}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <Edit3 className={`w-5 h-5 text-${currentTheme.primary}-600`} />
                  <span>{editingNote ? 'Edit Note' : 'Create New Note'}</span>
                  {editorContext?.subtopic && (
                    <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {editorContext.subtopic}
                    </span>
                  )}
                </h2>
                <div className="text-sm text-gray-600">
                  {editorContent.length} characters
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                placeholder="Start writing your notes here..."
                className="w-full h-96 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm leading-relaxed"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}
                autoFocus
              />
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Use Ctrl+Enter to save quickly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Auto-saved locally</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Tips */}
          <div className={`mt-6 bg-${currentTheme.primary}-50 rounded-lg p-4 border border-${currentTheme.primary}-200`}>
            <h3 className={`font-medium text-${currentTheme.primary}-800 mb-2`}>💡 Editor Tips:</h3>
            <ul className={`text-sm text-${currentTheme.primary}-700 space-y-1`}>
              <li>• Use markdown-style formatting for better organization</li>
              <li>• Press Tab to indent, Shift+Tab to outdent</li>
              <li>• Your notes are automatically saved to your browser's local storage</li>
              <li>• Use bullet points, numbered lists, and headings to structure your content</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'notes') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient}`}>
        {/* Notes Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('syllabus')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Back to Syllabus</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                  <StickyNote className={`w-7 h-7 text-${currentTheme.primary}-600`} />
                  <span>My Study Notes</span>
                </h1>
              </div>
              <div className={`text-sm text-gray-600 bg-${currentTheme.primary}-100 px-3 py-1 rounded-full`}>
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notes by content, subject, topic, or subtopic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border border-${currentTheme.primary}-200 rounded-lg focus:ring-2 focus:ring-${currentTheme.primary}-500 focus:border-transparent outline-none`}
              />
            </div>
          </div>
        </div>

        {/* Notes Content */}
        <div className="max-w-4xl mx-auto p-6">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <StickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Start creating notes from the syllabus topics'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setCurrentView('syllabus')}
                  className={`bg-${currentTheme.primary}-600 text-white px-6 py-3 rounded-lg hover:bg-${currentTheme.primary}-700 transition-colors`}
                >
                  Browse Syllabus
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNotes.map((note) => (
                <div key={note.id} className={`bg-white rounded-xl shadow-sm border border-${currentTheme.primary}-200 overflow-hidden hover:shadow-md transition-shadow`}>
                  <div className={`bg-${currentTheme.primary}-50 px-6 py-4 border-b border-${currentTheme.primary}-200`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className={`font-medium text-${currentTheme.primary}-700`}>{note.program}</span>
                          <ChevronRight className="w-4 h-4" />
                          <span>{note.subject}</span>
                          <ChevronRight className="w-4 h-4" />
                          <span className="font-medium text-gray-800">{note.topic}</span>
                          {note.subtopic && (
                            <>
                              <ChevronRight className="w-4 h-4" />
                              <span className="font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs">
                                {note.subtopic}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openNoteEditor(note.program, note.subject, note.topic, note.subtopic, note)}
                          className={`text-${currentTheme.primary}-600 hover:text-${currentTheme.primary}-700 p-1 rounded transition-colors`}
                          title="Edit note"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-red-500 hover:text-red-600 p-1 rounded transition-colors"
                          title="Delete note"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div 
                      className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap"
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '16px',
                        lineHeight: '1.7'
                      }}
                    >
                      {note.content}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Created: {formatDate(note.createdAt)}</span>
                        </div>
                        {note.updatedAt !== note.createdAt && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Updated: {formatDate(note.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-gray-400">
                        {note.content.length} characters
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                <BookOpen className={`w-8 h-8 text-${currentTheme.primary}-600`} />
                <span>OUAT PG Syllabus Package</span>
              </h1>
              <div className="relative">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className={`p-2 rounded-lg bg-${currentTheme.primary}-100 text-${currentTheme.primary}-600 hover:bg-${currentTheme.primary}-200 transition-colors`}
                  title="Change theme"
                >
                  <Palette className="w-5 h-5" />
                </button>
                
                {showThemeSelector && (
                  <div className="absolute top-12 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10 min-w-48">
                    <div className="text-sm font-medium text-gray-700 mb-2 px-2">Choose Theme</div>
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => {
                          setCurrentTheme(theme);
                          setShowThemeSelector(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center space-x-3 ${
                          currentTheme.name === theme.name ? 'bg-gray-100' : ''
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.gradient}`}></div>
                        <span className="text-sm">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setCurrentView('notes')}
              className={`flex items-center space-x-2 bg-${currentTheme.primary}-600 text-white px-4 py-2 rounded-lg hover:bg-${currentTheme.primary}-700 transition-colors`}
            >
              <FileText className="w-4 h-4" />
              <span>My Notes ({notes.length})</span>
            </button>
          </div>
          
          {/* Program Selection */}
          <div className="flex space-x-4">
            {programs.map((program) => (
              <button
                key={program.name}
                onClick={() => setSelectedProgram(program)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all ${
                  selectedProgram.name === program.name
                    ? `border-${program.color}-500 bg-${program.color}-50 text-${program.color}-700`
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                {program.icon}
                <span className="font-medium">{program.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid gap-6">
          {selectedProgram.subjects.map((subject, subjectIndex) => (
            <div key={subjectIndex} className={`bg-white rounded-xl shadow-sm border border-${currentTheme.primary}-200 overflow-hidden`}>
              <div className={`bg-${selectedProgram.color}-50 px-6 py-4 border-b border-${selectedProgram.color}-200`}>
                <h2 className={`text-xl font-semibold text-${selectedProgram.color}-800 flex items-center space-x-2`}>
                  {selectedProgram.icon}
                  <span>{subject.name}</span>
                  <span className={`ml-auto text-sm bg-${selectedProgram.color}-100 text-${selectedProgram.color}-700 px-2 py-1 rounded-full`}>
                    {subject.topics.length} topics
                  </span>
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {subject.topics.map((topic, topicIndex) => {
                    const noteExists = hasNote(selectedProgram.name, subject.name, topic);
                    const existingNote = getNote(selectedProgram.name, subject.name, topic);
                    const hasSubtopics = subject.subtopics && subject.subtopics[topic];
                    const isExpanded = expandedTopics[`${subject.name}-${topic}`];
                    
                    return (
                      <div key={topicIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${noteExists ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className="text-gray-700 font-medium">{topic}</span>
                            {hasSubtopics && (
                              <button
                                onClick={() => toggleTopicExpansion(subject.name, topic)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {noteExists ? (
                              <button
                                onClick={() => openNoteEditor(selectedProgram.name, subject.name, topic, undefined, existingNote)}
                                className={`flex items-center space-x-1 text-${currentTheme.primary}-600 hover:text-${currentTheme.primary}-700 text-sm px-3 py-1 rounded-md hover:bg-${currentTheme.primary}-50 transition-colors`}
                              >
                                <Edit3 className="w-4 h-4" />
                                <span>Edit Note</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => openNoteEditor(selectedProgram.name, subject.name, topic)}
                                className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Add Note</span>
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Subtopics */}
                        {hasSubtopics && isExpanded && (
                          <div className="bg-white border-t border-gray-200">
                            <div className="p-4">
                              <div className="space-y-2">
                                {subject.subtopics![topic].map((subtopic, subtopicIndex) => {
                                  const subtopicNoteExists = hasNote(selectedProgram.name, subject.name, topic, subtopic);
                                  const existingSubtopicNote = getNote(selectedProgram.name, subject.name, topic, subtopic);
                                  
                                  return (
                                    <div
                                      key={subtopicIndex}
                                      className="flex items-center justify-between p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors group"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${subtopicNoteExists ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-gray-600 text-sm">{subtopic}</span>
                                      </div>
                                      
                                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {subtopicNoteExists ? (
                                          <button
                                            onClick={() => openNoteEditor(selectedProgram.name, subject.name, topic, subtopic, existingSubtopicNote)}
                                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs px-2 py-1 rounded-md hover:bg-blue-200 transition-colors"
                                          >
                                            <Edit3 className="w-3 h-3" />
                                            <span>Edit</span>
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => openNoteEditor(selectedProgram.name, subject.name, topic, subtopic)}
                                            className="flex items-center space-x-1 text-gray-500 hover:text-gray-600 text-xs px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
                                          >
                                            <Plus className="w-3 h-3" />
                                            <span>Add</span>
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}